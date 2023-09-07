import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  Query,
  Patch,
} from '@nestjs/common';
import { MBookService } from './m_book.service';
import { CreateMBookDto } from './dto/create-m_book.dto';
import { MBookEntity } from './entities/m_book.entity';
import { UpdateMBookDto } from './dto/update-m_book.dto';

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

  @Get('Count')
  count(
    @Query('id') id: string | undefined,
    @Query('title') title: string | undefined,
    @Query('publisher') publisher: string | undefined,
    @Query('author') author: string | undefined,
  ) {
    return this.mBookService.count(id, title, publisher, author);
  }

  @Get('List')
  list(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('perPage', ParseIntPipe) perPage: number,
    @Query('id') id: string | undefined,
    @Query('title') title: string | undefined,
    @Query('publisher') publisher: string | undefined,
    @Query('author') author: string | undefined,
  ) {
    return this.mBookService.list(skip, perPage, id, title, publisher, author);
  }

  @Get('Frequentry')
  async frequentry() {
    return this.mBookService.frequentry();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const book = await this.mBookService.findOne(id);
    if (!book) {
      throw new NotFoundException(`Book with ${id} does not exist.`);
    }
    return new MBookEntity(book);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMBookDto: UpdateMBookDto,
  ) {
    return this.mBookService.update(id, updateMBookDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const book = await this.mBookService.findOne(id);
    if (!book) {
      throw new NotFoundException(`Book with ${id} does not exist.`);
    }
    return new MBookEntity(await this.mBookService.remove(id));
  }
}
