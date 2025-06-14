import { Router } from "express";
import { RatingsController } from "./ratings.controller";

const router = Router();
const controller = new RatingsController();

// @ts-expect-error whatever
router.post("/", controller.createRating.bind(controller));

export default router;
