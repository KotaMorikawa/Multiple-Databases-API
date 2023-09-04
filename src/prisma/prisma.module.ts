import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaSecondService } from './prisma-second.service';

@Module({
  providers: [PrismaService, PrismaSecondService],
  exports: [PrismaService, PrismaSecondService],
})
export class PrismaModule {}
