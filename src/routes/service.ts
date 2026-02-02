import { Router, type Request, type Response } from "express";
import { schemas } from "../validator/schema";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post('/', authMiddleware, async(req: Request, res: Response) => {
    try {
        const validation = schemas.CreateServiceSchema.safeParse(req.body);
        if(!validation.success) {
            return res.status(400).json({
                error: "InvalidInput"
            });
        }

        const { name, type, durationMinutes } = validation.data;

        if(req.user?.role !== "SERVICE_PROVIDER") {
            return res.status(403).json({
                error: "Forbidden (wrong role)"
            });
        }

        const service = await prisma.service.create({
            data: {
            name,
            type,
            durationMinutes,
            providerId: req.user.userId
            }
        });

        if (durationMinutes < 30 || durationMinutes > 120 || durationMinutes % 30 !== 0) {
            return res.status(400).json({
                error: "InvalidInput"
            });
        }

        return res.status(201).json({
            service
        });

    } catch (err) {
        return res.status(500).json({
            error: "InternalServerError"
        });
    }
});

// Service avaulability endpoint

router.post('/:serviceId/availability', authMiddleware, async(req: Request, res: Response) => {
    try {
        if (req.user?.role !== "SERVICE_PROVIDER") {
            return res.status(403).json({
                error: "Forbidden"
            });
        }

        const validation = schemas.SetAvailabilitySchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                error: "InvalidInput"
            });
        }

        const { serviceId } = req.params;
        const { dayOfWeek, startTime, endTime } = validation.data;

        if (startTime >= endTime) {
            return res.status(400).json({ 
                error: "InvalidTimeRange"
            });
        }

        const service = await prisma.service.findUnique({ where: { id: serviceId } });

        if (!service) {
            return res.status(404).json({ error: "ServiceNotFound" });
        }

    } catch (err) {
        return res.status(500).json({
            error: "InternalServerError"
        });
    }
});

export default router;