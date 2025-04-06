import { Router } from "express";
import { moviesController } from "../controllers/moviesController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

//add movie route
router.post(
  "/add-movie",
  authMiddleware.authenticate,
  moviesController.addMovie
);

router.get(
  "/get-movies",
  authMiddleware.authenticate,
  moviesController.getMovies
);

router.put(
  "/update-movie",
  authMiddleware.authenticate,
  moviesController.updateMovie
);

router.delete(
  "/delete-movie",
  authMiddleware.authenticate,
  moviesController.deleteMovie
);

export default router;
