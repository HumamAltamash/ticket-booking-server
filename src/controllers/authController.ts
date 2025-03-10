import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

class UserController {
  public register: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, email, password, isAdmin } = req.body;

      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      const user = new User({ name, email, password, isAdmin });
      await user.save();

      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };

  public login: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user || !(await user.comparePassword(password))) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }

      const accessToken = generateAccessToken(user._id.toString());
      const refreshToken = generateRefreshToken(user._id.toString());

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      res
        .status(200)
        .json({
          success: true,
          message: "Login successful",
          user: user._id,
          accessToken,
        });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };

  public refreshToken: RequestHandler = (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) res.status(401).json({ message: "No refresh token" });

    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string
      ) as { userId: string };
      const newAccessToken = generateAccessToken(decoded.userId);
      res.json({ success: true, accessToken: newAccessToken });
    } catch (error) {
      res.status(403).json({ message: "Invalid refresh token" });
    }
  };
}

export const userController = new UserController();
