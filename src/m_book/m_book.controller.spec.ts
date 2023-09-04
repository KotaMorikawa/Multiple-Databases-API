import { Test, TestingModule } from '@nestjs/testing';
import { MBookController } from './m_book.controller';
import { MBookService } from './m_book.service';

describe('MBookController', () => {
  let controller: MBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MBookController],
      providers: [MBookService],
    }).compile();

    controller = module.get<MBookController>(MBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
