import { Response, Request } from "express";
import { Event } from "../entity/Event";
import { datasource } from "../config/datasource";
import { v2 as cloudinary } from "cloudinary";

const eventRepo = datasource.getRepository(Event);

export const createEvent = async (req: Request, res: Response): Promise<void> => {
    const { title, date, department, description } = req.body;
    let mediaUrl = "https://www.visionvivaah.com/blog/wp-content/uploads/2019/10/Best-Event-Management-Company-In-Mumbai.jpg";

    try {
        const files = req.files as Express.Multer.File[];
        if (files && files.length > 0) {
            const uploadResult = await cloudinary.uploader.upload(files[0].path, {
                folder: "events"
            });
            mediaUrl = uploadResult.secure_url;
        }

        const newEvent = eventRepo.create({ title, date, department, description, mediaUrl });
        await eventRepo.save(newEvent);
        res.status(201).json(newEvent);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, date, department, description } = req.body;

    try {
        const event = await eventRepo.findOneBy({ id: parseInt(id) });

        if (!event) {
            res.status(404).json({ message: "Event not found" });
            return;
        }

        event.title = title;
        event.date = date;
        event.department = department;
        event.description = description;

        // Handle image upload if files are present
        const files = req.files as Express.Multer.File[];
        if (files && files.length > 0) {
            const uploadResult = await cloudinary.uploader.upload(files[0].path, {
                folder: "events"
            });
            event.mediaUrl = uploadResult.secure_url;
        }

        await eventRepo.save(event);
        res.status(200).json(event);
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const recentEvents = async (req: Request, res: Response): Promise<void> => {
    try {
        const events = await eventRepo.find({
            order: { date: "DESC" },
            take: 6 // Fetch the 5 most recent events
        })
        if (events.length === 0) {
            res.status(404).json({ message: "No recent events found" });
            return;
        }
        res.status(200).json(events);


    } catch (error) {
        console.error("Error fetching recent events:", error);
        res.status(500).json({ message: "Internal server error" });

    }

};

export const getEvents = async (req: Request, res: Response): Promise<void> => {
    try {
        const events = await eventRepo.find();
        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {

        const event = await eventRepo.findOneBy({ id: parseInt(id) });

        if (!event) {
            res.status(404).json({ message: "Event not found" });
            return;
        }

        res.status(200).json(event);


    } catch (error) {
        console.log("Error fetching event by ID:", error);
        res.status(500).json({ message: "Internal server error" });

    }
}


export const deleteEvent = async (req: Request, res: Response): Promise<void> => {

    const { id } = req.params;

    try {
        const event = await eventRepo.findOneBy({ id: parseInt(id) });

        if (!event) {
            res.status(404).json({ message: "Event not found" });
            return;
        }
        await eventRepo.remove(event);
        res.status(200).json({ message: "Event deleted successfully", event });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ message: "Internal server error" });
    }


}