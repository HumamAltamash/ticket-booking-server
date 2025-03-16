import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

class AuthMiddleware {
  public authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    console.log("token", token);
    try {
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as { userId: string };
      console.log("decoded", decoded);
      req.body.userId = decoded.userId;
      console.log("req.body", req.body);
      next();
    } catch (error) {
      res.status(403).json({ message: "Invalid or Expired Token" });
    }
  };
}

export default new AuthMiddleware();
