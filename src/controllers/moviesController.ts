import { NextFunction, RequestHandler, Request, Response } from "express";
import Movie from "../models/movieModel";
import mongoose from "mongoose";

class MoviesController {
  public addMovie: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.body.id;

      if (id && (await Movie.findOne({ id }))) {
        res.status(400).json({
          success: false,
          message: "Movie with that ID already exists",
        });
      }

      const newMovie = new Movie(req.body);

      await newMovie.save();
      res
        .status(201)
        .json({ success: true, message: "Movie added successfully" });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };

  public getMovies: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const allMovies = await Movie.find();
      res.status(200).json({
        success: true,
        message: "All movies fetched successfully",
        data: allMovies,
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };

  public updateMovie: RequestHandler = async (req: Request, res: Response) => {
    try {
      const id = req.body._id;
      console.log("id", id);
      if (!id) {
        res.status(400).json({
          success: false,
          message: "Movie ID is required",
        });
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
          success: false,
          message: "Invalid ID",
        });
      }

      const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });

      if (!movie) {
        res.status(404).json({
          success: false,
          message: "Movie not found",
        });
      }

      res
        .status(200)
        .json({ success: true, message: "Movie updated successfully" });
    } catch (err) {
      console.log("err", err);
      if (err instanceof Error) {
        res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };

  public deleteMovie: RequestHandler = async (req: Request, res: Response) => {
    try {
      const id = req.body.id;
      if (!id) {
        res.status(400).json({
          success: false,
          message: "Movie ID is required",
        });
      }
      const movie = await Movie.findOne;
      if (!movie) {
        res.status(404).json({
          success: false,
          message: "Movie not found",
        });
      }
      await Movie.findByIdAndDelete(id);
      res
        .status(200)
        .json({ success: true, message: "Movie deleted successfully" });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
}

export const moviesController = new MoviesController();
