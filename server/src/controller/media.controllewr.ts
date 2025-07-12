import e, { Request, Response } from "express";
import { datasource } from "../config/datasource";
import { Media } from "../entity/Media";
import { User } from "../entity/User";
import { Event } from "../entity/Event";
import { Comment } from "../entity/Comment";
import { Like } from "../entity/Like";

const mediaRepo = datasource.getRepository(Media);
const userRepo = datasource.getRepository(User);
const eventRepo = datasource.getRepository(Event);
const commentRepo = datasource.getRepository(Comment);
const likeRepo = datasource.getRepository(Like);

// upload meda
export const uploadMedia = async (req: Request, res: Response): Promise<void> => {
    try {
        const files = req.files as Express.Multer.File[];
        const userId = (req as any).user.id;
        const { eventId } = req.body;

        if (!files || files.length === 0) {
            res.status(400).json({ message: "No files uploaded" });
            return;
        }

        if (!eventId) {
            res.status(400).json({ message: "Event ID is required" });
            return;
        }

        const user = await userRepo.findOneBy({ id: userId });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const event = await eventRepo.findOneBy({ id: parseInt(eventId) });
        if (!event) {
            res.status(404).json({ message: "Event not found" });
            return;
        }

        // Build media records
        const mediaRecords = files.flatMap((file) => {
            const type = file.mimetype.startsWith("image")
                ? "image"
                : file.mimetype.startsWith("video")
                    ? "video"
                    : undefined;

            if (!type) return [];

            return [{
                url: file.path,
                type: type as "image" | "video",
                user: { id: user.id, name: user.name },
                event: { id: event.id, name: event.title },
                approved: user.isAdmin ? true : false,
                createdAt: new Date(),
            }];
        });

        const savedMedia = await mediaRepo.save(mediaRecords);

        res.status(201).json({
            message: "Media uploaded successfully",
            data: savedMedia,
        });

    } catch (error) {
        console.error("Error uploading media:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// all media
export const getMedia = async (req: Request, res: Response): Promise<void> => {
    try {
        const media = await mediaRepo.find({
            relations: ["user", "event"],
            order: { createdAt: "DESC" },
        });

        res.status(200).json({
            message: "Media retrieved successfully",
            data: media,
        });
    } catch (error) {
        console.error("Error retrieving media:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// all media
export const getMedia_Event = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get all events
        const events = await eventRepo.find();

        // For each event, get its media
        const eventsWithMedia = await Promise.all(
            events.map(async (event) => {
                const media = await mediaRepo.find({
                    where: { event: { id: event.id } },
                    relations: ["user", "event"],
                    order: { createdAt: "DESC" },
                });
                return {
                    event,
                    media,
                };
            })
        );

        res.status(200).json({
            message: "Events with their corresponding media retrieved successfully",
            data: eventsWithMedia,
        });
    } catch (error) {
        console.error("Error retrieving events with media:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



// approving nedia
export const approveMedia = async (req: Request, res: Response): Promise<void> => {
    try {
        const { mediaId } = req.params;

        if (!mediaId) {
            res.status(400).json({ message: "Media ID is required" });
            return;
        }

        const media = await mediaRepo.findOneBy({ id: parseInt(mediaId) });
        if (!media) {
            res.status(404).json({ message: "Media not found" });
            return;
        }

        media.approved = true;
        await mediaRepo.save(media);

        res.status(200).json({
            message: "Media approved successfully",
            data: media,
        });

    } catch (error) {
        console.error("Error approving media:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// delete media by id
export const deleteMedia = async (req: Request, res: Response): Promise<void> => {
    try {
        const { mediaId } = req.params;
        const userId = (req as any).user.id;

        if (!mediaId) {
            res.status(400).json({ message: "Media ID is required" });
            return;
        }

        const media = await mediaRepo.findOne({
            where: { id: parseInt(mediaId) },
            relations: ["user"]
        });
        if (!media) {
            res.status(404).json({ message: "Media not found" });
            return;
        }

        const user = await userRepo.findOneBy({ id: userId });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Only owner or admin can delete
        if (media.user.id !== user.id && !user.isAdmin) {
            res.status(403).json({ message: "Not authorized to delete this media" });
            return;
        }

        // Delete related likes and comments first to avoid foreign key constraint errors
        await likeRepo.delete({ media: { id: media.id } });
        await commentRepo.delete({ media: { id: media.id } });

        await mediaRepo.remove(media);

        res.status(200).json({
            message: "Media deleted successfully",
        });

    } catch (error) {
        console.error("Error deleting media:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// media by event
export const getMediaByEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { eventId } = req.params;

        if (!eventId) {
            res.status(400).json({ message: "Event ID is required" });
            return;
        }

        const event = await eventRepo.findOneBy({ id: parseInt(eventId) });
        if (!event) { 
            res.status(404).json({ message: "Event not found" });
            return;
        }

        // Get all media for the event
        const media = await mediaRepo.find({
            where: { event: { id: parseInt(eventId) }, approved: true },
            relations: ["user", "event"],
            order: { createdAt: "DESC" },
        });

        // For each media, get comment and like counts
        const mediaWithCounts = await Promise.all(
            media.map(async (m) => {
                const commentCount = await commentRepo.count({ where: { media: { id: m.id } } });
                const likeCount = await likeRepo.count({ where: { media: { id: m.id } } });
                return {
                    ...m,
                    commentCount,
                    likeCount,
                };
            })
        );

        res.status(200).json({
            message: "Media retrieved successfully",
            event: event,
            data: mediaWithCounts,
        });
    } catch (error) {
        console.error("Error retrieving media by event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMediaByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id;

        const media = await mediaRepo.find({
            where: { user: { id: userId } },
            relations: ["user", "event"],
            order: { createdAt: "DESC" },
        });

        res.status(200).json({
            message: "User media retrieved successfully",
            data: media,
        });
    } catch (error) {
        console.error("Error retrieving user media:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMediaById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { mediaId } = req.params;

        if (!mediaId) {
            res.status(400).json({ message: "Media ID is required" });
            return;
        }

        const media = await mediaRepo.findOne({
            where: { id: parseInt(mediaId) },
            relations: ["user", "event"],
        });

        if (!media) {
            res.status(404).json({ message: "Media not found" });
            return;
        }

        res.status(200).json({
            message: "Media retrieved successfully",
            data: media,
        });
    } catch (error) {
        console.error("Error retrieving media by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const rejectMedia = async (req: Request, res: Response): Promise<void> => {
    try {
        const { mediaId } = req.params;

        if (!mediaId) {
            res.status(400).json({ message: "Media ID is required" });
            return;
        }

        const media = await mediaRepo.findOneBy({ id: parseInt(mediaId) });
        if (!media) {
            res.status(404).json({ message: "Media not found" });
            return;
        }

        await mediaRepo.remove(media);

        res.status(200).json({
            message: "Media rejected and deleted successfully",
        });

    } catch (error) {
        console.error("Error rejecting media:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const listApprovedMedia = async (req: Request, res: Response): Promise<void> => {
    try {
        const media = await mediaRepo.find({
            where: { approved: true },
            relations: ["user", "event"],
            order: { createdAt: "DESC" },
        });

        res.status(200).json({
            message: "Approved media retrieved successfully",
            data: media,
        });
    } catch (error) {
        console.error("Error retrieving approved media:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
