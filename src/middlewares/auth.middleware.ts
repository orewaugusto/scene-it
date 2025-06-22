import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ message: "No token provided or invalid token format." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    if (!process.env.TOKEN_SECRET) {
      throw new Error("TOKEN_SECRET is not defined in environment variables.");
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as {
      id: number;
    };
    req.userId = decoded.id;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid or expired token." });
    } else {
      console.error(error);
      res.status(500).json({ message: "Failed to authenticate token." });
    }
    return;
  }
};
