import { UpdateMBookDto } from './dto/update-m_book.dto';
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
    const From = new Date(createMBookDto.from + 'Z');
    const To = new Date(createMBookDto.to + 'Z');
    To.setUTCHours(23, 59, 59, 999); //End of Day time

    const books = await this.prisma_second.m_book.findMany({
      where: {
        open_date: {
          gte: From,
          lte: To,
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

  count(
    id: number | undefined,
    title: string | undefined,
    publisher: string | undefined,
    author: string | undefined,
  ) {
    return this.prisma.m_book.aggregate({
      where: {
        book_id: id !== undefined ? { equals: id } : undefined,
        title: title !== undefined ? { contains: title } : undefined,
        publisher:
          publisher !== undefined ? { contains: publisher } : undefined,
        author: author !== undefined ? { contains: author } : undefined,
      },
      _count: true,
    });
  }

  list(
    skip: number,
    perPage: number,
    id: number | undefined,
    title: string | undefined,
    publisher: string | undefined,
    author: string | undefined,
  ) {
    return this.prisma.m_book.findMany({
      skip: skip,
      take: perPage,
      orderBy: {
        open_date: 'desc',
      },
      where: {
        book_id: id !== undefined ? { equals: id } : undefined,
        title: title !== undefined ? { contains: title } : undefined,
        publisher:
          publisher !== undefined ? { contains: publisher } : undefined,
        author: author !== undefined ? { contains: author } : undefined,
      },
    });
  }

  frequentry() {
    return this.prisma.m_book.findMany({
      take: 10,
      orderBy: {
        open_date: 'desc',
      },
    });
  }

  update(id: number, updateMBookDto: UpdateMBookDto) {
    return this.prisma.m_book.update({
      where: {
        book_id: id,
      },
      data: updateMBookDto,
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
