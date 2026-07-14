import mongoose from "mongoose";
import User from "./User";
import Bounty from "./Bounty";

export function setupInMemoryDb() {
  console.log("=========================================");
  console.log("Setting up in-memory mock database...");
  console.log("=========================================");

  const mockUsers: any[] = [
    {
      _id: new mongoose.Types.ObjectId("60c72b2f9b1d8b2bad18a221"),
      username: "Zcash Foundation",
      walletAddress: "zs1zcashfoundationaddress1234567890abcdefghijklmnopqrstuvwxyz",
      bio: "Sponsoring privacy-preserving technologies and cryptographic research on Zcash.",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDw39ScrxNa3ZgzehfSnq_YoRqJofZus71SLW3Bb7uZtGBzNwV55CayP5mje1Trt7rMVRtD5X-a74dAPHwUlq3MqhfX7flwAvqOgzv3ovfQJh_UZWcxifC0HJEMI5w9ijaNf9_U_9MlKEHHY85-PRy3DXq2P5WARiDSltoNf1_7QsxWWcaIevld4uD7XoV1Zhm581DkNtbo-FrRbPxihGvZVVlg-nUvq9FcP1tOkfAYu7gueTu3PRLBVBROwBxxllhyJ6i_0BhBGw",
      reputation: { bountiesFunded: 24, completionRate: 98, tasksCompleted: 0, totalRewardsEarned: 0, successRate: 5.0 },
      privacyScore: { average: 92, highest: 100, championCount: 5, totalShieldedEarnings: 0 },
      createdAt: new Date()
    },
    {
      _id: new mongoose.Types.ObjectId("60c72b2f9b1d8b2bad18a222"),
      username: "Alex ZecHub",
      email: "alex@zechub.org",
      walletAddress: "zs1freelanceralexaddress1234567890abcdefghijklmnopqrstuvwxyz",
      bio: "Full Stack Blockchain Developer specializing in Zero-Knowledge proofs and Rust protocol development.",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex",
      reputation: { bountiesFunded: 1, completionRate: 100, tasksCompleted: 12, totalRewardsEarned: 45.2, successRate: 4.9 },
      privacyScore: { average: 85, highest: 100, championCount: 2, totalShieldedEarnings: 38.5 },
      createdAt: new Date()
    }
  ];

  const mockBounties: any[] = [
    {
      _id: new mongoose.Types.ObjectId("60c72b2f9b1d8b2bad18a223"),
      creatorId: new mongoose.Types.ObjectId("60c72b2f9b1d8b2bad18a221"),
      title: "Implement ZSA Support in Lightwalletd",
      description: "Update the lightwalletd infrastructure to properly parse and index Zcash Shielded Assets (ZSA) transactions. Focus on maintaining backward compatibility and query efficiency.",
      reward: 1.0,
      status: "Open",
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      category: "Development",
      tags: ["Development", "Protocol"],
      skillsRequired: ["Go", "gRPC", "Zcash Protocol"],
      privacyScore: 80,
      privacyStatus: { funding: "Shielded", payout: "Mixed" },
      createdAt: new Date()
    },
    {
      _id: new mongoose.Types.ObjectId("60c72b2f9b1d8b2bad18a224"),
      creatorId: new mongoose.Types.ObjectId("60c72b2f9b1d8b2bad18a221"),
      title: "Educational Video Series: Frost Core",
      description: "Produce a series of 3 short, high-quality video tutorials explaining how threshold signatures work with FROST and demonstrating integration steps.",
      reward: 0.5,
      status: "Open",
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      category: "Content",
      tags: ["Content", "FROST"],
      skillsRequired: ["Video Editing", "FROST", "Cryptography"],
      privacyScore: 40,
      privacyStatus: { funding: "Transparent", payout: "Pending" },
      createdAt: new Date()
    }
  ];

  // Helper to clone objects to prevent shared reference mutations
  const clone = (obj: any) => {
    if (!obj) return obj;
    return JSON.parse(JSON.stringify(obj));
  };

  // Override User methods
  User.findOne = function(query: any) {
    let match = null;
    if (query.email) {
      match = mockUsers.find(u => u.email === query.email);
    } else if (query.walletAddress) {
      match = mockUsers.find(u => u.walletAddress === query.walletAddress);
    } else if (query.username) {
      match = mockUsers.find(u => u.username === query.username);
    }
    if (!match) return Promise.resolve(null) as any;
    const cloned = clone(match);
    cloned.save = User.prototype.save;
    return Promise.resolve(cloned) as any;
  };

  User.findById = function(id: any) {
    const match = mockUsers.find(u => u._id.toString() === id.toString());
    if (!match) return Promise.resolve(null) as any;
    const cloned = clone(match);
    cloned.save = User.prototype.save;
    return Promise.resolve(cloned) as any;
  };

  // Mock document instance constructor behavior by patching prototype.save
  User.prototype.save = function() {
    const self = this;
    const index = mockUsers.findIndex(u => u._id.toString() === self._id.toString());
    const data = {
      _id: self._id,
      username: self.username,
      email: self.email,
      walletAddress: self.walletAddress,
      bio: self.bio,
      avatar: self.avatar,
      reputation: self.reputation || { bountiesFunded: 0, completionRate: 0, tasksCompleted: 0, totalRewardsEarned: 0, successRate: 0 },
      privacyScore: self.privacyScore || { average: 0, highest: 0, championCount: 0, totalShieldedEarnings: 0 },
      createdAt: self.createdAt || new Date()
    };
    if (index >= 0) {
      mockUsers[index] = data;
    } else {
      mockUsers.push(data);
    }
    return Promise.resolve(self);
  };

  // Override Bounty methods
  Bounty.find = function() {
    const queryObj = {
      populate: function(path: string, select?: string) {
        const populated = mockBounties.map(b => {
          const bClone = clone(b);
          bClone.save = Bounty.prototype.save;
          if (path === 'creatorId') {
            const user = mockUsers.find(u => u._id.toString() === b.creatorId.toString());
            bClone.creatorId = user ? clone(user) : b.creatorId;
          }
          return bClone;
        });
        
        // Return a Promise-compatible structure
        return {
          then: function(resolve: any) {
            return Promise.resolve(populated).then(resolve);
          }
        };
      },
      then: function(resolve: any) {
        return Promise.resolve(mockBounties.map(b => {
          const bClone = clone(b);
          bClone.save = Bounty.prototype.save;
          return bClone;
        })).then(resolve);
      }
    };
    return queryObj as any;
  };

  Bounty.findById = function(id: any) {
    const bounty = mockBounties.find(b => b._id.toString() === id.toString());
    const queryObj = {
      populate: function(path: string, select?: string) {
        if (!bounty) return Promise.resolve(null);
        const bClone = clone(bounty);
        bClone.save = Bounty.prototype.save;
        if (path === 'creatorId') {
          const user = mockUsers.find(u => u._id.toString() === bounty.creatorId.toString());
          bClone.creatorId = user ? clone(user) : bounty.creatorId;
        }
        
        // Return a Promise-compatible structure
        return {
          then: function(resolve: any) {
            return Promise.resolve(bClone).then(resolve);
          }
        };
      },
      then: function(resolve: any) {
        if (!bounty) return Promise.resolve(null).then(resolve);
        const bClone = clone(bounty);
        bClone.save = Bounty.prototype.save;
        return Promise.resolve(bClone).then(resolve);
      }
    };
    return queryObj as any;
  };

  Bounty.prototype.save = function() {
    const self = this;
    const index = mockBounties.findIndex(b => b._id.toString() === self._id.toString());
    const data = {
      _id: self._id,
      creatorId: self.creatorId,
      title: self.title,
      description: self.description,
      reward: self.reward,
      status: self.status,
      deadline: self.deadline,
      category: self.category,
      tags: self.tags,
      skillsRequired: self.skillsRequired,
      privacyScore: self.privacyScore || 0,
      privacyStatus: self.privacyStatus || { funding: "Pending", payout: "Pending" },
      fundingTxHash: self.fundingTxHash,
      payoutTxHash: self.payoutTxHash,
      createdAt: self.createdAt || new Date()
    };
    if (index >= 0) {
      mockBounties[index] = data;
    } else {
      mockBounties.push(data);
    }
    return Promise.resolve(self);
  };
}
