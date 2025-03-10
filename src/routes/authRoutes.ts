import { Router } from "express";
import { userController } from "../controllers/authController";

const router = Router();

// Register route
router.post("/register", userController.register);

// Login route
router.post("/login", userController.login);

// refresh token route
router.post("/refresh", userController.refreshToken);

export default router;
