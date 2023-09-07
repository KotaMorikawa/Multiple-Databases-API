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
  Query,
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

  @Get('Count')
  count(
    @Query('id') id: string,
    @Query('name') name: string,
    @Query('web_pv') web_pv: string,
    @Query('pdf_pv') pdf_pv: string,
  ) {
    return this.mCatalogService.count(id, name, web_pv, pdf_pv);
  }

  @Get('List')
  list(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('perPage', ParseIntPipe) perPage: number,
    @Query('id') id: string,
    @Query('name') name: string,
    @Query('web_pv') web_pv: string,
    @Query('pdf_pv') pdf_pv: string,
  ) {
    return this.mCatalogService.list(skip, perPage, id, name, web_pv, pdf_pv);
  }

  @Get('Frequentry')
  async frequentry() {
    return this.mCatalogService.frequentry();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const catalog = await this.mCatalogService.findOne(id);
    if (!catalog) {
      throw new NotFoundException(`Catalog with ${id} does not exist`);
    }
    return new MCatalogEntity(catalog);
  }
  @Post('WebPVCount')
  async webPVCount(@Body('name') name: string) {
    return this.mCatalogService.webPVCount(name);
  }

  @Post('PdfPVCount')
  async pdfPVCount(@Body('name') name: string) {
    return this.mCatalogService.pdfPVCount(name);
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
