import { Router } from "express";
import { UsersController } from "./users.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const controller = new UsersController();

router.post("/login", controller.loginUser.bind(controller));
router.post("/", controller.createUser.bind(controller));

router.put("/:id", authMiddleware, controller.updateUser.bind(controller));
router.delete("/:id", authMiddleware, controller.deleteUser.bind(controller));
router.get("/:id", authMiddleware, controller.getUser.bind(controller));

export default router;
