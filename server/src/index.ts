import "reflect-metadata"
import { Request, Response } from "express";
import cors from "cors"

import authRoute from "./routes/auth.route";
import eventRoute from "./routes/event.route";
import mediaRoute from "./routes/media.route";
import commentRoute from "./routes/comment.route";
import likeRoute from "./routes/like.route";

import express from "express"
import { datasource } from "./config/datasource"

const app = express()

app.use(cors())
app.use(express.json())

const port = 3000

app.use("/auth", authRoute)
app.use("/event", eventRoute)
app.use("/media", mediaRoute)
app.use("/comment", commentRoute)
app.use("/like", likeRoute)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Welcome to Gallery Event API" })
})


datasource.initialize().then(() => {
    console.log("DB CONNECTED");
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);

    })

}).catch((err) => {
    console.log("Error connecting DB: ", err);

})


