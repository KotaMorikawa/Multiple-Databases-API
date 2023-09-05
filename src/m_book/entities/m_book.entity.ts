import { booksOnCatalogs, m_book } from '@prisma/client';

export class MBookEntity implements m_book {
  constructor(partial: Partial<MBookEntity>) {
    Object.assign(this, partial);
  }

  first_time: Date;
  last_time: Date;
  valid_state: number;
  book_id: number;
  open_date: Date;
  title: string;
  original_title: string | null;
  publisher: string;
  category_id: number;
  publication_month: string | null;
  author: string | null;
  translator: string | null;
  cover_img: string | null;
  hung_in_img: string | null;
  book_pdf: string | null;
  binding_img: string | null;
  isbn: string | null;
  open_flg: number;
  rank_pv: number;
  booksOnCatalogs?: booksOnCatalogs[];
}
