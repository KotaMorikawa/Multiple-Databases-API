import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMCatalogDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  open_date_from: Date;

  @IsString()
  @IsNotEmpty()
  open_date_to: Date;

  @IsString()
  @IsNotEmpty()
  ranking_date_from: Date;

  @IsString()
  @IsNotEmpty()
  ranking_date_to: Date;

  @IsString()
  @IsOptional()
  ranking?: string;
}
