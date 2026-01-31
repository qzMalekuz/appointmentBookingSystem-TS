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

router.post('/:serviceId/availability', (req: Request, res: Response) => {
    try {

        const { serviceId } = req.params;
        



    } catch (err) {
        return res.status(500).json({
            error: "InternalServerError"
        });
    }
});

export default router;