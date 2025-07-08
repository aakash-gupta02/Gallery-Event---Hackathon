import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import { Media } from "./Media";
import { Like } from "./Like";
import { Comment } from "./Comment";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  isAdmin!: boolean;

  @Column({
    nullable: true,
    default: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"

  })
  profileImage!: string;

  @OneToMany(() => Media, (media) => media.user)
  uploads!: Media[];

  @OneToMany(() => Like, (like) => like.user)
  likes!: Like[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[];
}
