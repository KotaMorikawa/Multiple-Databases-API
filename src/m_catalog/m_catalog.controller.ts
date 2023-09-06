import { MCatalogEntity } from './entities/m_catalog.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { MCatalogService } from './m_catalog.service';
import { CreateMCatalogDto } from './dto/create-m_catalog.dto';
import { UpdateMCatalogDto } from './dto/update-m_catalog.dto';

@Controller('m-catalog')
export class MCatalogController {
  constructor(private readonly mCatalogService: MCatalogService) {}

  @Post()
  async create(@Body() createMCatalogDto: CreateMCatalogDto) {
    return new MCatalogEntity(
      await this.mCatalogService.create(createMCatalogDto),
    );
  }

  @Get()
  async findAll() {
    const catalogs = await this.mCatalogService.findAll();
    return catalogs.map((catalog) => new MCatalogEntity(catalog));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const catalog = await this.mCatalogService.findOne(id);
    if (!catalog) {
      throw new NotFoundException(`Catalog with ${id} does not exist`);
    }
    return new MCatalogEntity(catalog);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMCatalogDto: UpdateMCatalogDto,
  ) {
    return new MCatalogEntity(
      await this.mCatalogService.update(id, updateMCatalogDto),
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const catalog = await this.mCatalogService.findOne(id);
    if (!catalog) {
      throw new NotFoundException(`Catalog with ${id} does not exist`);
    }
    return new MCatalogEntity(await this.mCatalogService.remove(id));
  }
}
