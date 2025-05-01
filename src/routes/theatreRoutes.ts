import { Router } from "express";
import { theatreController } from "../controllers/theatreController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

// Register route
router.post(
  "/add-theatre",
  authMiddleware.authenticate,
  theatreController.addTheatre
);
router.get(
  "/get-theatre-by-owner-id/:ownerId",
  authMiddleware.authenticate,
  theatreController.getTheatreByOwnerId
);
router.get(
  "/get-all-theatre",
  authMiddleware.authenticate,
  theatreController.getAllTheatre
);
router.put(
  "/update-theatre",
  authMiddleware.authenticate,
  theatreController.updateTheatre
);
router.delete(
  "/delete-theatre/:id",
  authMiddleware.authenticate,
  theatreController.deleteTheatre
);

export default router;
