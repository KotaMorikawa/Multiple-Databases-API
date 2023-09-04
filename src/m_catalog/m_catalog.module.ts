import { Module } from '@nestjs/common';
import { MCatalogService } from './m_catalog.service';
import { MCatalogController } from './m_catalog.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [MCatalogController],
  providers: [MCatalogService],
  imports: [PrismaModule],
})
export class MCatalogModule {}
