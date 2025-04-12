import { Router } from "express";
import { UsersController } from "./users.controller";

const router = Router();
const controller = new UsersController();

router.post('/', controller.createUser.bind(controller));

export default router;