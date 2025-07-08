import { Response, Request } from "express";
import { Event } from "../entity/Event";
import { datasource } from "../config/datasource";

const eventRepo = datasource.getRepository(Event);

export const createEvent = async (req: Request, res: Response): Promise<void> => {
    const { title, date, department } = req.body;

    try {
        const newEvent = eventRepo.create({ title, date, department });
        await eventRepo.save(newEvent);
        res.status(201).json(newEvent);
    } catch (error) {
        console.error("Error creating event:", error);
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

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, date, department } = req.body;

    try {
        const event = await eventRepo.findOneBy({ id: parseInt(id) });

        if (!event) {
            res.status(404).json({ message: "Event not found" });
            return;
        }

        event.title = title;
        event.date = date;
        event.department = department;

        await eventRepo.save(event);
        res.status(200).json(event);
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

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