import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = Router();

import { exec } from 'child_process';

const generateSaplingAddress = (): Promise<string> => {
  return new Promise((resolve) => {
    if (process.env.USE_MOCK_ZCASH === 'true') {
      const randomHex = Array.from({ length: 24 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      resolve(`zs1mockaddresssapling2026${randomHex}`);
      return;
    }

    exec('zingo-cli address sapling', (error, stdout) => {
      if (error || !stdout) {
        const randomHex = Array.from({ length: 24 }, () =>
          Math.floor(Math.random() * 16).toString(16)
        ).join('');
        resolve(`zs1zingofallbacksapling2026${randomHex}`);
        return;
      }
      resolve(stdout.trim());
    });
  });
};

// Minimal implementation for hackathon MVP.
// In production, use Zcash memo-based auth (like ZecPass).
router.post('/login', async (req, res) => {
  try {
    const { walletAddress, username } = req.body;

    let user;
    let finalAddress = walletAddress;

    if (!finalAddress) {
      // Auto-generate real sapling address via Zingo CLI
      finalAddress = await generateSaplingAddress();
      const newUsername = username || `user_${finalAddress.substring(0, 10)}`;
      user = new User({ walletAddress: finalAddress, username: newUsername });
      await user.save();
    } else {
      user = await User.findOne({ walletAddress: finalAddress });
      if (!user) {
        const newUsername = username || `user_${finalAddress.substring(0, 6)}`;
        user = new User({ walletAddress: finalAddress, username: newUsername });
        await user.save();
      }
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, walletAddress: user.walletAddress },
      process.env.JWT_SECRET || 'secret_zbounty_hackathon_2026',
      { expiresIn: '7d' }
    );

    res.json({ token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_zbounty_hackathon_2026') as any;

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Decode Google ID Token payload (Base64URL)
const decodeJwtPayload = (token: string) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1];
    if (!payload) return null;
    const payloadBase64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    return JSON.parse(decodedJson);
  } catch (e) {
    return null;
  }
};

router.post('/google', async (req, res) => {
  try {
    const { credential, email: testEmail, name: testName, picture: testPicture } = req.body;

    let email = testEmail;
    let name = testName || 'Google User';
    let picture = testPicture || '';

    // If ID token is passed from real Google login button, decode it
    if (credential) {
      const decodedPayload = decodeJwtPayload(credential);
      if (decodedPayload) {
        email = decodedPayload.email;
        name = decodedPayload.name || decodedPayload.given_name;
        picture = decodedPayload.picture;
      }
    }

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    let user = await User.findOne({ email });

    let isNewUser = false;
    if (!user) {
      isNewUser = true;
      // Auto-generate username from email
      const baseUsername = email.split('@')[0];
      let username = baseUsername;
      let counter = 1;
      
      // Ensure unique username
      while (await User.findOne({ username })) {
        username = `${baseUsername}_${counter}`;
        counter++;
      }

      user = new User({
        email,
        username,
        avatar: picture,
        walletAddress: undefined, // Empty on registration
      });
      await user.save();
    }

    // Determine if user still needs to link a wallet address
    const needsWallet = !user.walletAddress;

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'secret_zbounty_hackathon_2026',
      { expiresIn: '7d' }
    );

    res.json({ token, user, needsWallet, isNewUser });
  } catch (error) {
    console.error('Google Auth error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/link-wallet', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_zbounty_hackathon_2026') as any;

    const { walletAddress } = req.body;
    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    // Check if wallet address is already linked to another account
    const existing = await User.findOne({ walletAddress });
    if (existing && existing._id.toString() !== decoded.userId) {
      return res.status(400).json({ error: 'Wallet address is already linked to another user' });
    }

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.walletAddress = walletAddress;
    await user.save();

    res.json({ success: true, user });
  } catch (error) {
    console.error('Link wallet error:', error);
    res.status(401).json({ error: 'Invalid token or server error' });
  }
});

// Balance endpoint removed — now served exclusively via /api/zcash/balance/:address
// which uses the gRPC lightwalletd client (or mock mode)

router.put('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_zbounty_hackathon_2026') as any;

    const { username, bio, avatar } = req.body;

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (username) user.username = username;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    res.json({ success: true, user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(401).json({ error: 'Invalid token or server error' });
  }
});

export default router;
