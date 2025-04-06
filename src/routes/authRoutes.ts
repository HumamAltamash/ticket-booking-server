import { Router } from "express";
import { authController } from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

// Register route
router.post("/register", authController.register);

// Login route
router.post("/login", authController.login);

// refresh token route
router.post("/refresh", authController.refreshToken);

router.get(
  "/get-current-user",
  authMiddleware.authenticate,
  authController.getCurrentUser
);

router.post("/logout", authController.logout);

export default router;
