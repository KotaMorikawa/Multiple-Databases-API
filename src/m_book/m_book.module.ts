import { Module } from '@nestjs/common';
import { MBookService } from './m_book.service';
import { MBookController } from './m_book.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [MBookController],
  providers: [MBookService],
  imports: [PrismaModule],
})
export class MBookModule {}
