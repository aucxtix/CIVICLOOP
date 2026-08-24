import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, requireRole } from '../middlewares/auth.js';
import type { AuthRequest } from '../middlewares/auth.js';

const router = Router();


// ==========================================
// CITIZEN ROUTES
// ==========================================

// CREATE: Citizen creates a new report
router.post('/', authenticate, requireRole(['CITIZEN']), async (req: AuthRequest, res) => {
  try {
    const { imageUrl, description, latitude, longitude, address, category, aiConfidence } = req.body;
    const citizenId = req.user!.id;

    const report = await prisma.report.create({
      data: {
        citizenId,
        imageUrl,
        description,
        latitude,
        longitude,
        address,
        category,
        aiConfidence,
        status: 'REPORTED',
      },
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create report' });
  }
});

// READ: Citizen views their own reports
router.get('/my-reports', authenticate, requireRole(['CITIZEN']), async (req: AuthRequest, res) => {
  try {
    const citizenId = req.user!.id;
    const reports = await prisma.report.findMany({
      where: { citizenId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// ==========================================
// WORKER ROUTES
// ==========================================

// READ: Worker views pending reported tasks
router.get('/pending', authenticate, requireRole(['WORKER']), async (req: AuthRequest, res) => {
  try {
    const reports = await prisma.report.findMany({
      where: { status: 'REPORTED' },
      orderBy: { createdAt: 'desc' },
      include: { citizen: { select: { name: true } } }
    });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pending tasks' });
  }
});

// READ: Worker views their currently assigned active tasks
router.get('/my-tasks', authenticate, requireRole(['WORKER']), async (req: AuthRequest, res) => {
  try {
    const workerId = req.user!.id;
    const reports = await prisma.report.findMany({
      where: { 
        workerId,
        status: { in: ['ASSIGNED', 'EN_ROUTE', 'ARRIVED', 'IN_PROGRESS'] }
      },
      orderBy: { updatedAt: 'desc' },
    });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch your tasks' });
  }
});

// UPDATE: Worker accepts or updates a task status
router.put('/:id/status', authenticate, requireRole(['WORKER']), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { status, afterImageUrl } = req.body;
    const workerId = req.user!.id;

    const report = await prisma.report.findUnique({ where: { id } });
    if (!report) return res.status(404).json({ error: 'Task not found' });

    // Validate state transitions
    const validTransitions: Record<string, string[]> = {
      'REPORTED': ['ASSIGNED'],
      'ASSIGNED': ['EN_ROUTE'],
      'EN_ROUTE': ['ARRIVED'],
      'ARRIVED': ['IN_PROGRESS'],
      'IN_PROGRESS': ['COMPLETED']
    };

    if (!validTransitions[report.status]?.includes(status)) {
      return res.status(400).json({ error: `Invalid transition from ${report.status} to ${status}` });
    }

    // Only allow assignment if currently REPORTED, or if they are the assigned worker
    if (report.status !== 'REPORTED' && report.workerId !== workerId) {
      return res.status(403).json({ error: 'You are not assigned to this task' });
    }
    
    if (status === 'COMPLETED' && !afterImageUrl) {
      return res.status(400).json({ error: 'After photo evidence is required for completion' });
    }

    const updated = await prisma.report.update({
      where: { id },
      data: { 
        status,
        workerId,
        ...(afterImageUrl && { afterImageUrl })
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task status' });
  }
});

export default router;
