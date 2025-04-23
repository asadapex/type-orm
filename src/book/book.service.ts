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
  create(data: CreateBookDto) {
    const created = this.book.create({
      ...data,
      user: { id: data.user },
      genre: data.genre.map((id) => ({
        id,
      })),
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

  async update(id: number, data: UpdateBookDto) {
    const updateData: any = {
      ...data,
    };

    if (data.user) {
      updateData.user = { id: data.user };
    }

    if (data.genre) {
      updateData.genre = data.genre.map((id) => ({ id }));
    }

    await this.book.update(id, updateData);
    const one = await this.book.findOne({
      where: { id },
      relations: ['user', 'genre'],
    });

    return one;
  }

  async remove(id: number) {
    const deleted = await this.book.findOneBy({ id });
    await this.book.delete(id);
    return deleted;
  }
}
