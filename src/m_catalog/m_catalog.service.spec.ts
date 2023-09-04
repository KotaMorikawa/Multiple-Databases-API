import { Test, TestingModule } from '@nestjs/testing';
import { MCatalogService } from './m_catalog.service';

describe('MCatalogService', () => {
  let service: MCatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MCatalogService],
    }).compile();

    service = module.get<MCatalogService>(MCatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
