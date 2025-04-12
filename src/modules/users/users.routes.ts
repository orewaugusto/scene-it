import { Router } from "express";
import { UsersController } from "./users.controller";

const router = Router();
const controller = new UsersController();

router.post('/', controller.createUser);

export default router;