import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { datasource } from "../config/datasource";
import dotenv from "dotenv";
dotenv.config();

const userRepo = datasource.getRepository(User);

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default-secret") as { id: number };

    const user = await userRepo.findOneBy({ id: decoded.id });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    (req as any).user = user;
    
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};