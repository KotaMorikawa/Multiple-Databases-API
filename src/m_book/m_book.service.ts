import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMBookDto } from './dto/create-m_book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaSecondService } from 'src/prisma/prisma-second.service';

@Injectable()
export class MBookService {
  constructor(
    private prisma: PrismaService,
    private prisma_second: PrismaSecondService,
  ) {}

  async create(createMBookDto: CreateMBookDto) {
    const books = await this.prisma_second.m_book.findMany({
      where: {
        open_date: {
          gte: new Date(createMBookDto.from),
          lte: new Date(createMBookDto.to),
        },
      },
      select: {
        first_time: true,
        last_time: true,
        valid_state: true,
        book_id: true,
        open_date: true,
        title: true,
        original_title: true,
        publisher: true,
        category_id: true,
        publication_month: true,
        author: true,
        translator: true,
        cover_img: true,
        hung_in_img: true,
        book_pdf: true,
        binding_img: true,
        isbn: true,
        open_flg: true,
        rank_pv: true,
      },
    });

    if (books.length == 0) {
      throw new NotFoundException('Not found books');
    }

    return this.prisma.m_book.createMany({
      data: books,
      skipDuplicates: true,
    });
  }

  findAll() {
    return this.prisma.m_book.findMany({});
  }

  findOne(id: number) {
    return this.prisma.m_book.findUnique({
      where: {
        book_id: id,
      },
    });
  }

  remove(id: number) {
    return this.prisma.m_book.delete({
      where: {
        book_id: id,
      },
    });
  }
}
