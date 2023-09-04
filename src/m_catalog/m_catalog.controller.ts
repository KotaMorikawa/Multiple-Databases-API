import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MCatalogService } from './m_catalog.service';
import { CreateMCatalogDto } from './dto/create-m_catalog.dto';
import { UpdateMCatalogDto } from './dto/update-m_catalog.dto';

@Controller('m-catalog')
export class MCatalogController {
  constructor(private readonly mCatalogService: MCatalogService) {}

  @Post()
  create(@Body() createMCatalogDto: CreateMCatalogDto) {
    return this.mCatalogService.create(createMCatalogDto);
  }

  @Get()
  findAll() {
    return this.mCatalogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mCatalogService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMCatalogDto: UpdateMCatalogDto,
  ) {
    return this.mCatalogService.update(id, updateMCatalogDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.mCatalogService.remove(id);
  }
}
