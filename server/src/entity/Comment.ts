import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { Media } from "./Media";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  text!: string;

  @ManyToOne(() => User, (user) => user.comments)
  user!: User;

  @ManyToOne(() => Media, (media) => media.comments)
  media!: Media;

  @CreateDateColumn()
  createdAt!: Date;
}


