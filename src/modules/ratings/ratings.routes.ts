import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { RatingsController } from "./ratings.controller";

const router = Router();
const controller = new RatingsController();

router.post("/", authMiddleware, controller.createRating.bind(controller));

export default router;
