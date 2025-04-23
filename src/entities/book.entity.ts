import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Genre } from './genre.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => User, (user) => user.book)
  user: User;

  @ManyToOne(() => Genre, (genre) => genre.book)
  genre: Genre[];
}
