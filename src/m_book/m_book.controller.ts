import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { MBookService } from './m_book.service';
import { CreateMBookDto } from './dto/create-m_book.dto';
import { MBookEntity } from './entities/m_book.entity';

@Controller('m-book')
export class MBookController {
  constructor(private readonly mBookService: MBookService) {}

  @Post()
  async create(@Body() createMBookDto: CreateMBookDto) {
    return this.mBookService.create(createMBookDto);
  }

  @Get()
  async findAll() {
    const books = await this.mBookService.findAll();
    return books.map((book) => new MBookEntity(book));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const book = await this.mBookService.findOne(id);
    if (!book) {
      throw new NotFoundException(`Book with ${id} does not exist.`);
    }
    return new MBookEntity(book);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new MBookEntity(await this.mBookService.remove(id));
  }
}
