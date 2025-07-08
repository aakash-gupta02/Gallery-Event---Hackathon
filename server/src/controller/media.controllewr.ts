import { Request, Response } from "express";
import { datasource } from "../config/datasource";
import { Media } from "../entity/Media";
import { User } from "../entity/User";
import { Event } from "../entity/Event";
import { mediaUpload } from "../middleware/multer";

// Helper to check admin
// Helper to check admin
function isAdmin(user: User) {
    return !!user.isAdmin;
}

// POST /media - Upload media (multiple images)

export const uploadMedia = async (req: Request, res: Response) => {
    const user = (req as any).user as User;
    const { eventId, type = "image" } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!eventId || !files || files.length === 0) {
        return res.status(400).json({ message: "Event ID and images are required" });
    }

    // Check event exists
    const event = await datasource.getRepository(Event).findOneBy({ id: Number(eventId) });
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Save each image as a Media entity
    const mediaRepo = datasource.getRepository(Media);
    const mediaEntities = files.map(file => {
        const media = mediaRepo.create({
            url: file.path, // cloudinary url
            type,
            userId: user.id,
            eventId: event.id,
            approved: isAdmin(user),
        });
        return media;
    });

    await mediaRepo.save(mediaEntities);
    res.status(201).json(mediaEntities);
};

// GET /media - List approved media
export const listApprovedMedia = async (_req: Request, res: Response) => {
    const media = await datasource.getRepository(Media).find({
        where: { approved: true },
        order: { createdAt: "DESC" },
        relations: [],
    });
    res.json(media);
};

// GET /media/pending - List pending media (admin only)
export const listPendingMedia = async (req: Request, res: Response) => {
    const user = (req as any).user as User;
    if (!isAdmin(user)) return res.status(403).json({ message: "Forbidden" });

    const media = await datasource.getRepository(Media).find({
        where: { approved: false },
        order: { createdAt: "DESC" },
        relations: [],
    });
    res.json(media);
};

// PUT /media/:id/approve - Approve media (admin only)
export const approveMedia = async (req: Request, res: Response) => {
    const user = (req as any).user as User;
    if (!isAdmin(user)) return res.status(403).json({ message: "Forbidden" });

    const mediaRepo = datasource.getRepository(Media);
    const media = await mediaRepo.findOneBy({ id: Number(req.params.id) });
    if (!media) return res.status(404).json({ message: "Media not found" });

    media.approved = true;
    await mediaRepo.save(media);
    res.json(media);
};

// DELETE /media/:id - Delete media (admin or owner)
export const deleteMedia = async (req: Request, res: Response) => {
    const user = (req as any).user as User;
    const mediaRepo = datasource.getRepository(Media);
    const media = await mediaRepo.findOneBy({ id: Number(req.params.id) });
    if (!media) return res.status(404).json({ message: "Media not found" });

    if (!isAdmin(user) && media.userId !== user.id)
        return res.status(403).json({ message: "Forbidden" });

    await mediaRepo.remove(media);
    res.json({ message: "Media deleted" });
};
