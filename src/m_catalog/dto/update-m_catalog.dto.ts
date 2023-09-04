import { PartialType } from '@nestjs/mapped-types';
import { CreateMCatalogDto } from './create-m_catalog.dto';

export class UpdateMCatalogDto extends PartialType(CreateMCatalogDto) {}
