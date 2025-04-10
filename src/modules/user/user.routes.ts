import { Router } from "express";
import * as UserController from "./user.controller";

const router = Router();

router.post('/', UserController.createUser);

export default router;