import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMCatalogDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @IsNotEmpty()
  openDateFrom: Date;

  @IsDate()
  @IsNotEmpty()
  openDateTo: Date;

  @IsDate()
  @IsNotEmpty()
  ranking_date_from: Date;

  @IsDate()
  @IsNotEmpty()
  ranking_date_to: Date;

  @IsString()
  @IsOptional()
  ranking?: string;
}
