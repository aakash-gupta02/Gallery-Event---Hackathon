import "reflect-metadata"
import { Request, Response } from "express";
import cors from "cors"

import authRoute from "./routes/auth.route";
import eventRoute from "./routes/event.route";
import mediaRoute from "./routes/media.route";
import commentRoute from "./routes/comment.route";

import express from "express"
import { datasource } from "./config/datasource"
import { authMiddleware } from "./middleware/autth.middleware";

const app = express()

app.use(cors())
app.use(express.json())

const port = 3000

app.use("/auth", authRoute)
app.use("/event", eventRoute)
app.use("/media", mediaRoute)
app.use("/comment", commentRoute)

app.get("/test", authMiddleware , (req: Request, res: Response) => {
    res.send("Welcome to the API, " + (req as any).user.isAdmin);
});


datasource.initialize().then(() => {
    console.log("DB CONNECTED");
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);

    })

}).catch((err) => {
    console.log("Error connecting DB: ", err);

})


