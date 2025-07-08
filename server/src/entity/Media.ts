import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn
} from "typeorm";
import { User } from "./User";
import { Event } from "./Event";
import { Like } from "./Like";
import { Comment } from "./Comment";

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url!: string;

  @Column({ default: "image" })
  type!: "image" | "video";

  @Column({ default: false })
  approved!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.uploads)
  user!: User;

  @ManyToOne(() => Event, (event) => event.mediaItems)
  event!: Event;

  @OneToMany(() => Like, (like) => like.media)
  likes!: Like[];

  @OneToMany(() => Comment, (comment) => comment.media)
  comments!: Comment[];
}
