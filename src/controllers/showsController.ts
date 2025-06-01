import { NextFunction, Request, Response, RequestHandler } from "express";
import Show from "../models/showModel";

class ShowsController {
  public addShow: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        movieId,
        theatreId,
        showStartTime,
        showEndTime,
        date,
        totalSeats,
        price,
      } = req.body;

      // Validate input data
      if (
        !movieId ||
        !theatreId ||
        !showStartTime ||
        !showEndTime ||
        !date ||
        !totalSeats ||
        !price
      ) {
        res.status(400).json({ message: "All fields are required" });
      }

      let availableSeats = req?.body?.availableSeats || totalSeats;

      // Create a new show
      const newShow = await Show.create({
        movieId,
        theatreId,
        showStartTime,
        showEndTime,
        date,
        availableSeats,
        totalSeats,
        price,
      });

      res.status(201).json({ success: true, show: newShow });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  public getShows: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const shows = await Show.find()
        .populate({
          path: "movieId",
          select: "title poster description genre duration language",
        })
        .populate({
          path: "theatreId",
          select: "name location",
        });

      const formattedShows = shows.map((show) => {
        const showObj = show.toObject();
        return {
          ...showObj,
          movie: showObj.movieId,
          theatre: showObj.theatreId,
          movieId: undefined,
          theatreId: undefined,
        };
      });

      res.status(200).json({ success: true, shows: formattedShows });
    } catch (error) {
      console.error("Error fetching shows:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  public updateShow: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updateData = req.body;
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "Show ID is required" });
      }
      console.log("id", id);

      const updatedShow = await Show.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      console.log("Updated Show:", updatedShow);

      if (!updatedShow) {
        res.status(404).json({ message: "Show not found" });
      }

      res.status(200).json({ success: true, show: updatedShow });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  public deleteShow: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "Show ID is required" });
      }

      const deletedShow = await Show.findByIdAndDelete(id);

      if (!deletedShow) {
        res.status(404).json({ message: "Show not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Show deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
}

export const showsController = new ShowsController();
