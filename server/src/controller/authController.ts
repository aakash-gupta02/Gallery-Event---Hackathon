import { Request, Response } from "express";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import { datasource } from "../config/datasource";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

const userRepo = datasource.getRepository(User);

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        const existingUser = await userRepo.findOne({ where: { email } });

        if (existingUser) {
            res.status(409).json({ message: "Email already registered" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = userRepo.create({
            name,
            email,
            password: hashedPassword,
            isAdmin: false,
            profileImage: "https://cdn-icons-png.flaticon.com/512/149/149071.png" // fallback
        });

        await userRepo.save(newUser);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                profileImage: newUser.profileImage
            }
        });

    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: "Server error" });
        return;
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }

        const user = await userRepo.findOne({ where: { email } });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                profileImage: user.profileImage
            }
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {

        const user = await userRepo.find()

        res.status(200).json({
            message: "User fetched successfully",
            user
        });

    } catch (err) {
        console.error("Get user error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

export const toggleAdmin = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const user = await userRepo.findOneBy({ id: parseInt(id) });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        user.isAdmin = !user.isAdmin;
        await userRepo.save(user);

        res.status(200).json({
            message: user.isAdmin
                ? "User promoted to admin successfully"
                : "User demoted to normal user successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                profileImage: user.profileImage
            }
        });

    } catch (error) {
        console.error("Error toggling admin status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = (req as any).user; 
    try {
        const user = await userRepo.findOneBy({ id: parseInt(id) });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        await userRepo.remove(user);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = (req as any).user; 
    try {
        const user = await userRepo.findOneBy({ id: parseInt(id) });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const { name, email, password } = req.body;
        let profileImage = user.profileImage;

        const files = req.files as Express.Multer.File[];
        if (files && files.length > 0) {
            const uploadResult = await cloudinary.uploader.upload(files[0].path, {
                folder: "user_profiles",
            });
            profileImage = uploadResult.secure_url;
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        user.profileImage = profileImage;

        await userRepo.save(user);

        res.status(200).json({
            message: "User updated successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        console.error("Update user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getLoggedInUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = (req as any).user;
        const user = await userRepo.findOneBy({ id: parseInt(id) });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({
            message: "User fetched successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        console.error("Get logged in user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};