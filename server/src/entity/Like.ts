import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, CreateDateColumn } from "typeorm";

import { User } from "./User";
import { Media } from "./Media";



@Entity()
@Unique(["user", "media"])
export class Like {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.likes)
  user!: User;

  @ManyToOne(() => Media, (media) => media.likes)
  media!: Media;

  @CreateDateColumn()
  createdAt!: Date;
}
