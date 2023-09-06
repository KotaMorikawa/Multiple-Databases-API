import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMBookDto {
  @IsString()
  @IsNotEmpty()
  from: Date;

  @IsString()
  @IsNotEmpty()
  to: Date;
}
