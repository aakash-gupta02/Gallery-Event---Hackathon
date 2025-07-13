import { Response, Request } from "express";
import { Comment } from "../entity/Comment";
import { User } from "../entity/User";
import { Media } from "../entity/Media";
import { datasource } from "../config/datasource";

const commentRepository = datasource.getRepository(Comment);
const userRepository = datasource.getRepository(User);
const mediaRepository = datasource.getRepository(Media);

export const createComment = async (req: Request, res: Response): Promise<void> => {
    const { text, mediaId } = req.body;
    const userId = (req as any).user.id;

    try {
        const user = await userRepository.findOneBy({ id: userId });
        const media = await mediaRepository.findOneBy({ id: mediaId });
        if (!user || !media) {
            res.status(404).json({ message: "User or Media not found" });
            return;
        }
        const comment = new Comment();
        comment.text = text;
        comment.user = user;
        comment.media = media;
        const savedComment = await commentRepository.save(comment);

        // Only return necessary fields
        res.status(201).json({
            id: savedComment.id,
            text: savedComment.text,
            createdAt: savedComment.createdAt,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            media: {
                id: media.id,

            }
        });
        return;
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};

export const getComments = async (req: Request, res: Response): Promise<void> => {
    const { mediaId } = req.params;

    try {
        const comments = await commentRepository.find({
            where: { media: { id: parseInt(mediaId) } },
            relations: ["user", "media"],
            order: { createdAt: "DESC" }
        });

        // Map to only return necessary fields
        const filteredComments = comments.map(comment => ({
            id: comment.id,
            text: comment.text,
            createdAt: comment.createdAt,
            user: comment.user ? {
                id: comment.user.id,
                name: comment.user.name,
                email: comment.user.email,
                profileImage: comment.user.profileImage,
            } : null,
            media: comment.media ? {
                id: comment.media.id,
            } : null
        }));

        res.status(200).json(filteredComments);
        return;
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};

export const allComments = async (req: Request, res: Response): Promise<void> => {

    try {
        const comments = await commentRepository.find({

            relations: ["user", "media"],
            order: { createdAt: "DESC" }
        });

        // Map to only return necessary fields
        const filteredComments = comments.map(comment => ({
            id: comment.id,
            text: comment.text,
            createdAt: comment.createdAt,
            user: comment.user ? {
                id: comment.user.id,
                name: comment.user.name,
                email: comment.user.email,
                profileImage: comment.user.profileImage,
            } : null,
            media: comment.media ? {
                id: comment.media.id,
            } : null
        }));

        res.status(200).json(filteredComments);
        return;
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const comment = await commentRepository.findOne({
            where: { id: parseInt(id) },
            relations: ["user"]
        });
        if (!comment) {
            res.status(404).json({ message: "Comment not found" });
            return;
        }

        const user = (req as any).user;
        if (comment.user.id !== user.id && !user.isAdmin) {
            res.status(403).json({ message: "You do not have permission to delete this comment" });
            return;
        }

        await commentRepository.remove(comment);
        res.status(200).json({ message: "Comment deleted successfully" });
        return;
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};

export const updateComment = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { text } = req.body;

    try {
        const comment = await commentRepository.findOne({
            where: { id: parseInt(id) },
            relations: ["user"]
        });
        if (!comment) {
            res.status(404).json({ message: "Comment not found" });
            return;
        }

        const user = (req as any).user;
        if (comment.user.id !== user.id) {
            res.status(403).json({ message: "You do not have permission to update this comment" });
            return;
        }

        comment.text = text;
        const updatedComment = await commentRepository.save(comment);

        res.status(200).json({
            id: updatedComment.id,
            text: updatedComment.text,
            createdAt: updatedComment.createdAt,
            user: {
                id: comment.user.id,
                name: comment.user.name,
                email: comment.user.email
            }
        });
        return;
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};

export const userComments = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user.id;

    try {
        const comments = await commentRepository.find({
            where: { user: { id: userId } },
            relations: ["media"],
            order: { createdAt: "DESC" }
        });

        const filteredComments = comments.map(comment => ({
            id: comment.id,
            text: comment.text,
            createdAt: comment.createdAt,
            media: comment.media ? {
                id: comment.media.id,
                url: comment.media.url,
            } : null
        }));

        res.status(200).json(filteredComments);
        return;
    } catch (error) {
        console.error("Error fetching user comments:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};