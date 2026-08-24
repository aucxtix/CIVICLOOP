import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, requireRole } from '../middlewares/auth.js';
import type { AuthRequest } from '../middlewares/auth.js';

const router = Router();

// GET all vehicles
router.get('/', authenticate, requireRole(['ADMIN']), async (req: AuthRequest, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: {
        driver: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: 'asc' }
    });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

// POST create a new vehicle
router.post('/', authenticate, requireRole(['ADMIN']), async (req: AuthRequest, res) => {
  try {
    const { vehicleId, modelAndPlate, status, capacity, location } = req.body;
    
    const vehicle = await prisma.vehicle.create({
      data: {
        vehicleId,
        modelAndPlate,
        status: status || 'Idle',
        capacity: capacity || '0% Full',
        location: location || 'Depot'
      }
    });
    
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create vehicle' });
  }
});

// PUT update a vehicle
router.put('/:id', authenticate, requireRole(['ADMIN']), async (req: AuthRequest, res) => {
  try {
    const id = req.params.id as string;
    const { status, driverId, location } = req.body;
    
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(driverId !== undefined && { driverId }),
        ...(location && { location })
      },
      include: {
        driver: { select: { name: true } }
      }
    });
    
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update vehicle' });
  }
});

export default router;
