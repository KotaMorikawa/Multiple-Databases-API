import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateMBookDto {
  @IsDate()
  @IsNotEmpty()
  from: Date;

  @IsDate()
  @IsNotEmpty()
  to: Date;
}
