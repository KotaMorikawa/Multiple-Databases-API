import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ParseIntNullPipe implements PipeTransform {
  transform(value: any) {
    return value ? Number(value) : undefined;
  }
}
