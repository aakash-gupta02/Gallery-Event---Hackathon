import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { datasource } from "../config/datasource";  


const userRepo = datasource.getRepository(User);

export const isAdminMiddleware = async (req: Request, res: Response, next: Function): Promise<void> => {
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

    if (!user.isAdmin) {
      res.status(403).json({ message: "Forbidden: Admins only" });
      return;
    }

    (req as any).user = user;

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};