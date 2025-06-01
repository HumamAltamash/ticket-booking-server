import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { showsController } from "../controllers/showsController";

const router = Router();

router.post("/add-show", authMiddleware.authenticate, showsController.addShow);
router.get("/get-shows", authMiddleware.authenticate, showsController.getShows);
router.put(
  "/update-show/:id",
  authMiddleware.authenticate,
  showsController.updateShow
);
router.delete(
  "/delete-show/:id",
  authMiddleware.authenticate,
  showsController.deleteShow
);

export default router;
