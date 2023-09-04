import { Test, TestingModule } from '@nestjs/testing';
import { MBookService } from './m_book.service';

describe('MBookService', () => {
  let service: MBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MBookService],
    }).compile();

    service = module.get<MBookService>(MBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
