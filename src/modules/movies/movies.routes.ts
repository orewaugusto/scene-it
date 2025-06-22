import { Router } from "express";
import { MoviesController } from "./movies.controller";

const router = Router();
const controller = new MoviesController();

router.get("/", controller.findMoviesByTitle.bind(controller));

export default router;
