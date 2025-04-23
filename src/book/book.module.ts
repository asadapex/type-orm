import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { User } from 'src/entities/user.entity';
import { Genre } from 'src/entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, User, Genre])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
