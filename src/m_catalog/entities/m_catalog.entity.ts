import { booksOnCatalogs, m_catalog } from '@prisma/client';

export class MCatalogEntity implements m_catalog {
  constructor(partial: Partial<MCatalogEntity>) {
    Object.assign(this, partial);
  }

  catalog_id: number;
  name: string;
  web_pageview: number;
  pdf_pageview: number;
  ranking: string | null;
  open_date_from: Date;
  open_date_to: Date;
  ranking_date_from: Date;
  ranking_date_to: Date;
  created_at: Date;
  updated_at: Date;
  booksOnCatalogs: booksOnCatalogs[];
}
