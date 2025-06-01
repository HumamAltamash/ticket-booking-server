import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

class AuthController {
  public register: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, email, password, role } = req.body;

      const userExists = await User.findOne({ email });
      if (userExists) {
        res
          .status(400)
          .json({ success: false, message: "User already exists" });
        return;
      }

      const user = new User({ name, email, password, role });
      await user.save();

      res
        .status(201)
        .json({ success: true, message: "User created successfully" });
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

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          user: user._id,
          accessToken,
          role: user.role,
        },
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
      res.json({
        success: true,
        message: "Access token generated",
        data: {
          accessToken: newAccessToken,
          user: decoded.userId,
        },
      });
    } catch (error) {
      res.status(403).json({ message: "Invalid refresh token" });
    }
  };

  public logout: RequestHandler = (req: Request, res: Response) => {
    res.clearCookie("refreshToken");
    res.json({ success: true, message: "Logged out" });
  };

  public getCurrentUser: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const { userId } = req.body;
    const user = await User.findById(userId).select("-password");
    res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  };
}

export const authController = new AuthController();
