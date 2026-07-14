import { Router } from 'express';
import Bounty from '../models/Bounty';
import { ZcashService } from '../services/zcash.service';
import { calculatePrivacyScore, getPrivacyBadge } from '../services/privacyScore.service';

const router = Router();

// Get all bounties
router.get('/', async (req, res) => {
  try {
    const bounties = await Bounty.find().populate('creatorId', 'username avatar reputation');
    res.json(bounties);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get bounty by ID
router.get('/:id', async (req, res) => {
  try {
    const bounty = await Bounty.findById(req.params.id).populate('creatorId', 'username avatar reputation');
    if (!bounty) return res.status(404).json({ error: 'Bounty not found' });
    res.json(bounty);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create bounty
router.post('/', async (req, res) => {
  try {
    // In production, use auth middleware to get creatorId
    const { creatorId, title, description, reward, deadline, category, tags, skillsRequired } = req.body;

    const bounty = new Bounty({
      creatorId,
      title,
      description,
      reward,
      deadline,
      category,
      tags,
      skillsRequired,
    });

    await bounty.save();
    res.status(201).json(bounty);
  } catch (error) {
    console.error('Bounty creation error:', error);
    res.status(500).json({ error: 'Server error', details: error });
  }
});

// Fund bounty
router.post('/:id/fund', async (req, res) => {
  try {
    const { txHash, privacyLevel } = req.body;
    const bounty = await Bounty.findById(req.params.id);

    if (!bounty) return res.status(404).json({ error: 'Bounty not found' });

    // Verify deposit using ZcashService
    const isValid = await ZcashService.verifyDeposit(txHash);
    if (!isValid) return res.status(400).json({ error: 'Invalid deposit transaction' });

    bounty.status = 'Open';
    bounty.fundingTxHash = txHash;
    bounty.privacyStatus.funding = privacyLevel || 'Transparent';

    // Recalculate privacy score
    bounty.privacyScore = calculatePrivacyScore(bounty.privacyStatus.funding, bounty.privacyStatus.payout);

    await bounty.save();
    res.json(bounty);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Select winner and execute shielded payout
router.post('/:id/payout', async (req, res) => {
  try {
    const { contributorAddress, amount, memo } = req.body;
    const bounty = await Bounty.findById(req.params.id);

    if (!bounty) return res.status(404).json({ error: 'Bounty not found' });

    // Execute shielded transaction
    const txid = await ZcashService.sendShielded(contributorAddress, amount, memo);

    bounty.status = 'Completed';
    bounty.payoutTxHash = txid;
    bounty.privacyStatus.payout = 'Shielded'; // Assuming we strictly use shielded for payouts

    // Recalculate privacy score
    bounty.privacyScore = calculatePrivacyScore(bounty.privacyStatus.funding, bounty.privacyStatus.payout);

    await bounty.save();
    res.json({ message: 'Payout successful', txid, bounty });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Submit work for a bounty
router.post('/:id/submit', async (req, res) => {
  try {
    const { contributorId, link, notes } = req.body;
    const bounty = await Bounty.findById(req.params.id);

    if (!bounty) return res.status(404).json({ error: 'Bounty not found' });

    // In a real app, we would create a Submission document
    // const submission = new Submission({ bountyId: bounty._id, contributorId, link, notes });
    // await submission.save();

    // Update bounty status
    bounty.status = 'In Review';
    await bounty.save();

    res.json({ message: 'Submission successful', bounty });
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
