import { Router } from "express";
import { userController } from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

// Register route
router.post("/register", userController.register);

// Login route
router.post("/login", userController.login);

// refresh token route
router.post("/refresh", userController.refreshToken);

router.get(
  "/get-current-user",
  authMiddleware.authenticate,
  userController.getCurrentUser
);

router.post("/logout", userController.logout);

export default router;
