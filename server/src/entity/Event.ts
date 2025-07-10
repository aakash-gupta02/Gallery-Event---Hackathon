import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import { Media } from "./Media";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ default: "" })
  description!: string;

  @Column({ default: "https://www.visionvivaah.com/blog/wp-content/uploads/2019/10/Best-Event-Management-Company-In-Mumbai.jpg" })
  mediaUrl!: string;

  @Column()
  date!: Date;

  @Column()
  department!: string;

  @OneToMany(() => Media, (media) => media.event)
  mediaItems!: Media[];
}
