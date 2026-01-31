import { Router, type Request, type Response } from "express";
import { schemas } from "../validator/schema";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();



export default router;