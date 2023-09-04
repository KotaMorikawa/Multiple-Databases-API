import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MBookModule } from './m_book/m_book.module';
import { MCatalogModule } from './m_catalog/m_catalog.module';

@Module({
  imports: [PrismaModule, MBookModule, MCatalogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
