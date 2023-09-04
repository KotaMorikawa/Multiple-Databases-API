import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MBookService } from './m_book.service';
import { CreateMBookDto } from './dto/create-m_book.dto';

@Controller('m-book')
export class MBookController {
  constructor(private readonly mBookService: MBookService) {}

  @Post()
  create(@Body() createMBookDto: CreateMBookDto) {
    return this.mBookService.create(createMBookDto);
  }

  @Get()
  findAll() {
    return this.mBookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mBookService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.mBookService.remove(id);
  }
}
