import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, requireRole } from '../middlewares/auth.js';
import type { AuthRequest } from '../middlewares/auth.js';

const router = Router();


// ==========================================
// ADMIN VERIFICATION & MANAGEMENT ROUTES
// ==========================================

// Get all reports for admin dashboard
router.get('/reports', authenticate, requireRole(['ADMIN']), async (req: AuthRequest, res) => {
  try {
    const reports = await prisma.report.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        citizen: { select: { name: true, email: true } },
        worker: { select: { name: true, email: true } }
      }
    });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch city reports' });
  }
});

// Verify a completed cleanup
router.put('/reports/:id/verify', authenticate, requireRole(['ADMIN']), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { isApproved, rejectionReason, civicTrustScore } = req.body;

    const report = await prisma.report.findUnique({ where: { id } });
    if (!report) return res.status(404).json({ error: 'Report not found' });
    if (report.status !== 'COMPLETED') return res.status(400).json({ error: 'Only completed reports can be verified' });

    if (isApproved) {
      // Approve verification
      const updated = await prisma.report.update({
        where: { id },
        data: { 
          status: 'VERIFIED',
          civicTrustScore: civicTrustScore || 100
        }
      });

      // Award Civic Credits to Citizen
      if (report.citizenId) {
        await prisma.user.update({
          where: { id: report.citizenId },
          data: { civicCredits: { increment: 50 } }
        });

        await prisma.transaction.create({
          data: {
            userId: report.citizenId,
            amount: 50,
            type: 'EARN_VERIFY',
            description: 'Verified Cleanup Reward'
          }
        });
      }

      res.json(updated);
    } else {
      // Reject verification, send back to in progress or reopened
      const updated = await prisma.report.update({
        where: { id },
        data: { 
          status: 'REOPENED',
          // Ideally store rejection reason somewhere (maybe a new field or AuditLog)
        }
      });
      res.json(updated);
    }

  } catch (error) {
    res.status(500).json({ error: 'Failed to process verification' });
  }
});

export default router;
