import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly book: Repository<Book>,
  ) {}
  create(createBookDto: CreateBookDto) {
    const created = this.book.create({
      ...createBookDto,
      user: createBookDto.user,
      genre: createBookDto.genre,
    });
    return this.book.save(created);
  }

  async findAll() {
    const all = await this.book.find();
    return all;
  }

  async findOne(id: number) {
    const one = await this.book.findOneBy({ id });
    return one;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.book.update(id, updateBookDto);
    const one = await this.book.findOneBy({ id });
    return one;
  }

  async remove(id: number) {
    const deleted = await this.book.findOneBy({ id });
    await this.book.delete(id);
    return deleted;
  }
}
