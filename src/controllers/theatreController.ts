import { NextFunction, Request, RequestHandler, Response } from "express";
import Theatre from "../models/theatreModel";

class TheatreController {
  public addTheatre: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, location, owner, phone, email, isActive } = req.body;
      const theatre = new Theatre({
        name,
        location,
        owner,
        phone,
        email,
        isActive,
      });
      await theatre.save();
      res
        .status(201)
        .json({ success: true, message: "Theatre added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  public getAllTheatre: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const theatres = await Theatre.find().populate("owner", "name email");
      res.status(200).json({
        success: true,
        message: "All theatre fetched successfully",
        data: theatres,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  public getTheatreByOwnerId: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const ownerId = req.params.id;
      const theatres = await Theatre.find({ owner: ownerId }).populate(
        "owner",
        "name email"
      );
      if (theatres.length === 0) {
        res.status(404).json({
          success: false,
          message: "No theatres found for this owner",
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: "Theatre fetched successfully",
        theatres,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  public updateTheatre: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id, name, location, owner, phone, email, isActive } = req.body;
      if (!id) {
        res
          .status(400)
          .json({ success: false, message: "Theatre ID is required" });
        return;
      }
      const theatre = await Theatre.findByIdAndUpdate(
        id,
        { name, location, owner, phone, email, isActive },
        { new: true }
      );
      if (!theatre) {
        res.status(404).json({ success: false, message: "Theatre not found" });
        return;
      }
      res.status(200).json({ success: true, theatre });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  public deleteTheatre: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const theatre = await Theatre.findByIdAndDelete(id);
      if (!theatre) {
        res.status(404).json({ success: false, message: "Theatre not found" });
        return;
      }
      res
        .status(200)
        .json({ success: true, message: "Theatre deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
}

export const theatreController = new TheatreController();
