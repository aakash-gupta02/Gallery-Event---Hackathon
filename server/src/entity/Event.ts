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

  @Column()
  date!: Date;

  @Column()
  department!: string;

  @OneToMany(() => Media, (media) => media.event)
  mediaItems!: Media[];
}
