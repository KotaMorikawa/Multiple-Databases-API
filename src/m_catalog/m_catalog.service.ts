import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMCatalogDto } from './dto/create-m_catalog.dto';
import { UpdateMCatalogDto } from './dto/update-m_catalog.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MCatalogService {
  constructor(private prisma: PrismaService) {}

  async create(createMCatalogDto: CreateMCatalogDto) {
    const importFrom = new Date(createMCatalogDto.open_date_from + 'Z');
    const importTo = new Date(createMCatalogDto.open_date_to + 'Z');
    const rankingFrom = new Date(createMCatalogDto.ranking_date_from + 'Z');
    const rankingTo = new Date(createMCatalogDto.ranking_date_to + 'Z');
    importTo.setUTCHours(23, 59, 59, 999); //End of Day time
    rankingTo.setUTCHours(23, 59, 59, 999);

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

    return this.prisma.m_catalog.create({
      data: {
        name: createMCatalogDto.name,
        open_date_from: importFrom,
        open_date_to: importTo,
        ranking_date_from: rankingFrom,
        ranking_date_to: rankingTo,
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
      include: {
        booksOnCatalogs: {
          include: {
            book: true,
          },
        },
      },
    });
  }

  findName(key: string) {
    return this.prisma.m_catalog.findFirst({
      where: {
        name: key,
      },
      include: {
        booksOnCatalogs: {
          include: {
            book: true,
          },
        },
      },
    });
  }

  count(
    id: number | undefined,
    name: string | undefined,
    web_pv: number | undefined,
    pdf_pv: number | undefined,
  ) {
    return this.prisma.m_catalog.aggregate({
      where: {
        catalog_id: id !== undefined ? { equals: id } : undefined,
        name: name !== undefined ? { contains: name } : undefined,
        web_pageview: web_pv !== undefined ? { equals: web_pv } : undefined,
        pdf_pageview: pdf_pv !== undefined ? { equals: pdf_pv } : undefined,
      },
      _count: true,
    });
  }

  list(
    skip: number,
    perPage: number,
    id: number | undefined,
    name: string | undefined,
    web_pv: number | undefined,
    pdf_pv: number | undefined,
  ) {
    return this.prisma.m_catalog.findMany({
      skip: skip,
      take: perPage,
      orderBy: {
        created_at: 'desc',
      },
      where: {
        catalog_id: id !== undefined ? { equals: id } : undefined,
        name: name !== undefined ? { contains: name } : undefined,
        web_pageview: web_pv !== undefined ? { equals: web_pv } : undefined,
        pdf_pageview: pdf_pv !== undefined ? { equals: pdf_pv } : undefined,
      },
      include: {
        booksOnCatalogs: true,
      },
    });
  }

  frequentry() {
    return this.prisma.m_catalog.findMany({
      take: 10,
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async webPVCount(name: string) {
    const existData = await this.prisma.m_catalog.findFirst({
      where: {
        name: name,
      },
      select: {
        catalog_id: true,
        web_pageview: true,
      },
    });

    if (!existData) {
      throw new NotFoundException('Not found catalog');
    }

    return this.prisma.m_catalog.update({
      where: {
        catalog_id: existData.catalog_id,
      },
      data: {
        web_pageview: existData.web_pageview + 1,
      },
    });
  }

  async pdfPVCount(name: string) {
    const existData = await this.prisma.m_catalog.findFirst({
      where: {
        name: name,
      },
      select: {
        catalog_id: true,
        pdf_pageview: true,
      },
    });

    if (!existData) {
      throw new NotFoundException('Not found catalog');
    }

    return this.prisma.m_catalog.update({
      where: {
        catalog_id: existData.catalog_id,
      },
      data: {
        pdf_pageview: existData.pdf_pageview + 1,
      },
    });
  }

  async update(id: number, updateMCatalogDto: UpdateMCatalogDto) {
    const importFrom = new Date(updateMCatalogDto.open_date_from + 'Z');
    const importTo = new Date(updateMCatalogDto.open_date_to + 'Z');
    const rankingFrom = new Date(updateMCatalogDto.ranking_date_from + 'Z');
    const rankingTo = new Date(updateMCatalogDto.ranking_date_to + 'Z');
    importTo.setUTCHours(23, 59, 59, 999); //End of Day time
    rankingTo.setUTCHours(23, 59, 59, 999);

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
          name: updateMCatalogDto.name,
          open_date_from: importFrom,
          open_date_to: importTo,
          ranking_date_from: rankingFrom,
          ranking_date_to: rankingTo,
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
