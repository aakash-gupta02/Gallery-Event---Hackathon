import { DataSource } from "typeorm";
import dotenv from "dotenv"
import { User } from "../entity/User";
import { Media } from "../entity/Media";
import { Like } from "../entity/Like";
import { Event } from "../entity/Event";
import { Comment } from "../entity/Comment";

dotenv.config()


export const datasource = new DataSource({
  type: "mysql",
  url: process.env.DB_URL   ,
  synchronize: true,
  entities: [User, Event, Media, Like, Comment],
});

