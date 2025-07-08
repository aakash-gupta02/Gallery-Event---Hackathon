import e, { Request, Response } from "express";
import { Like } from "../entity/Like";
import { User } from "../entity/User";  
import { Media } from "../entity/Media";
import { datasource } from "../config/datasource";
const likeRepository = datasource.getRepository(Like);
const userRepository = datasource.getRepository(User);
const mediaRepository = datasource.getRepository(Media);


export const createLike = async (req: Request, res: Response): Promise<void> => {
    const { mediaId } = req.params;
    const userId = (req as any).user.id;

    try {
        const user = await userRepository.findOneBy({ id: userId });
        const media = await mediaRepository.findOneBy({ id: parseInt(mediaId) });  
        if (!user || !media) {
            res.status(404).json({ message: "User or Media not found" });
            return;
        }
        // Check if the like already exists
        const existingLike = await likeRepository.findOne({
            where: { user: { id: userId }, media: { id: parseInt(mediaId) } }
        }); 
        if (existingLike) {
            res.status(400).json({ message: "You have already liked this media" });
            return;
        }   
        const like = new Like();
        like.user = user;
        like.media = media;
        const savedLike = await likeRepository.save(like);
        res.status(201).json({ message: "Like created successfully",
            id: savedLike.id,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            media: {
                id: media.id,
            },
            createdAt: savedLike.createdAt
        }); 
        return;
    } catch (error) {
        console.error("Error creating like:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }   
}

export const removeLike = async (req: Request, res: Response): Promise<void> => {
    const { mediaId } = req.params;
    const userId = (req as any).user.id;

    try {
        const like = await likeRepository.findOne({
            where: { user: { id: userId }, media: { id: parseInt(mediaId) } }
        });
        if (!like) {
            res.status(404).json({ message: "Like not found" });
            return;
        }
        await likeRepository.remove(like);
        res.status(200).json({ message: "Like removed successfully" });
        return;
    } catch (error) {
        console.error("Error removing like:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}

export const getLikes = async (req: Request, res: Response): Promise<void> => {
    const { mediaId } = req.params;

    try {
        const likes = await likeRepository.find({
            where: { media: { id: parseInt(mediaId) } },
            relations: ["user", "media"],
            order: { createdAt: "DESC" }
        });

        // Map to only return necessary fields
        const filteredLikes = likes.map(like => ({
            id: like.id,
            user: like.user ? {
                id: like.user.id,
                name: like.user.name,
                email: like.user.email
            } : null,
            media: like.media ? {
                id: like.media.id,
            } : null,
            createdAt: like.createdAt
        }));

       const totalLikes =  filteredLikes.length 

        res.status(200).json({filteredLikes, totalLikes});
        return;

    } catch (error) {
        console.error("Error fetching likes:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}
