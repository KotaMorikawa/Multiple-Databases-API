import { PartialType } from '@nestjs/mapped-types';
import { CreateMBookDto } from './create-m_book.dto';

export class UpdateMBookDto extends PartialType(CreateMBookDto) {}
