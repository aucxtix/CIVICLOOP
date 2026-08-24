import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, requireRole } from '../middlewares/auth.js';
import type { AuthRequest } from '../middlewares/auth.js';

const router = Router();

// ==========================================
// REWARDS ROUTES
// ==========================================

// GET all active rewards (Accessible to citizens)
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const rewards = await prisma.reward.findMany({
      where: { isActive: true },
      orderBy: { creditsRequired: 'asc' },
    });
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rewards' });
  }
});

// GET all rewards including inactive (Admin only)
router.get('/all', authenticate, requireRole(['ADMIN']), async (req: AuthRequest, res) => {
  try {
    const rewards = await prisma.reward.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all rewards' });
  }
});

// POST create a new reward (Admin only)
router.post('/', authenticate, requireRole(['ADMIN']), async (req: AuthRequest, res) => {
  try {
    const { name, description, imageUrl, creditsRequired, stock, partner } = req.body;
    
    const reward = await prisma.reward.create({
      data: {
        name,
        description,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80',
        creditsRequired: parseInt(creditsRequired),
        stock: parseInt(stock),
        partner
      },
    });
    
    res.status(201).json(reward);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reward' });
  }
});

// PUT update a reward (Admin only)
router.put('/:id', authenticate, requireRole(['ADMIN']), async (req: AuthRequest, res) => {
  try {
    const id = req.params.id as string;
    const { name, description, imageUrl, creditsRequired, stock, partner, isActive } = req.body;
    
    const reward = await prisma.reward.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(imageUrl && { imageUrl }),
        ...(creditsRequired !== undefined && { creditsRequired: parseInt(creditsRequired) }),
        ...(stock !== undefined && { stock: parseInt(stock) }),
        ...(partner && { partner }),
        ...(isActive !== undefined && { isActive }),
      },
    });
    
    res.json(reward);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update reward' });
  }
});

// DELETE a reward (Admin only)
router.delete('/:id', authenticate, requireRole(['ADMIN']), async (req: AuthRequest, res) => {
  try {
    const id = req.params.id as string;
    await prisma.reward.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete reward' });
  }
});

// POST redeem a reward (Citizen)
router.post('/:id/redeem', authenticate, requireRole(['CITIZEN']), async (req: AuthRequest, res) => {
  try {
    const id = req.params.id as string;
    const userId = req.user!.id;
    
    // Use a transaction to ensure atomic redemption
    const result = await prisma.$transaction(async (tx) => {
      const reward = await tx.reward.findUnique({ where: { id } });
      const user = await tx.user.findUnique({ where: { id: userId } });
      
      if (!reward || !reward.isActive) throw new Error('Reward not found or inactive');
      if (reward.stock <= 0) throw new Error('Reward out of stock');
      if (!user || user.civicCredits < reward.creditsRequired) throw new Error('Insufficient Civic Credits');
      
      // Update stock
      await tx.reward.update({
        where: { id },
        data: { stock: reward.stock - 1 }
      });
      
      // Deduct points
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { civicCredits: user.civicCredits - reward.creditsRequired }
      });
      
      // Log transaction
      await tx.transaction.create({
        data: {
          userId,
          amount: -reward.creditsRequired,
          type: 'SPEND_REWARD',
          description: `Redeemed: ${reward.name}`
        }
      });
      
      return updatedUser;
    });
    
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to redeem reward' });
  }
});

export default router;
