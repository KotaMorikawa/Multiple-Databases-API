import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMCatalogDto } from './dto/create-m_catalog.dto';
import { UpdateMCatalogDto } from './dto/update-m_catalog.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MCatalogService {
  constructor(private prisma: PrismaService) {}

  async create(createMCatalogDto: CreateMCatalogDto) {
    const importFrom = new Date(createMCatalogDto.openDateFrom);
    const importTo = new Date(createMCatalogDto.openDateTo);
    importTo.setUTCHours(23, 59, 59, 999); //End of Day time

    const bookIds = await this.prisma.m_book.findMany({
      where: {
        open_date: {
          gte: importFrom,
          lte: importTo,
        },
      },
      select: {
        book_id: true,
      },
    });

    if (!bookIds) {
      throw new NotFoundException('Not found books');
    }

    return this.prisma.m_catalog.create({
      data: {
        name: createMCatalogDto.name,
        open_date_from: importFrom,
        open_date_to: importTo,
        ranking_date_from: new Date(createMCatalogDto.ranking_date_from),
        ranking_date_to: new Date(createMCatalogDto.ranking_date_to),
        ranking: createMCatalogDto.ranking,
        booksOnCatalogs: {
          create: bookIds.map((bookId: { book_id: number }) => {
            return {
              book: { connect: { book_id: bookId.book_id } },
            };
          }),
        },
      },
    });
  }

  findAll() {
    return this.prisma.m_catalog.findMany({});
  }

  findOne(id: number) {
    return this.prisma.m_catalog.findUnique({
      where: {
        catalog_id: id,
      },
    });
  }

  async update(id: number, updateMCatalogDto: UpdateMCatalogDto) {
    const importFrom = new Date(updateMCatalogDto.openDateFrom);
    const importTo = new Date(updateMCatalogDto.openDateTo);
    importTo.setUTCHours(23, 59, 59, 999); //End of Day time

    const bookIds = await this.prisma.m_book.findMany({
      where: {
        open_date: {
          gte: importFrom,
          lte: importTo,
        },
      },
      select: {
        book_id: true,
      },
    });

    if (bookIds.length == 0) {
      throw new NotFoundException('Not found books');
    }

    const updatedMCatalog = await this.prisma.$transaction(async (prisma) => {
      await prisma.booksOnCatalogs.deleteMany({
        where: {
          catalog_id: id,
        },
      });

      return await prisma.m_catalog.update({
        where: {
          catalog_id: id,
        },
        data: {
          open_date_from: importFrom,
          open_date_to: importTo,
          ranking_date_from: new Date(updateMCatalogDto.ranking_date_from),
          ranking_date_to: new Date(updateMCatalogDto.ranking_date_to),
          ranking: updateMCatalogDto.ranking,
          booksOnCatalogs: {
            create: bookIds.map((bookId: { book_id: number }) => {
              return {
                book: { connect: { book_id: bookId.book_id } },
              };
            }),
          },
        },
        select: {
          catalog_id: true,
          name: true,
          web_pageview: true,
          pdf_pageview: true,
          ranking: true,
          open_date_from: true,
          open_date_to: true,
          ranking_date_from: true,
          ranking_date_to: true,
          created_at: true,
          updated_at: true,
          booksOnCatalogs: true,
        },
      });
    });

    return updatedMCatalog;
  }

  remove(id: number) {
    return this.prisma.m_catalog.delete({
      where: {
        catalog_id: id,
      },
    });
  }
}
