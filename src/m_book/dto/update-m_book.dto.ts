import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  cover_img: string;

  @IsString()
  @IsNotEmpty()
  open_date: string;
}
