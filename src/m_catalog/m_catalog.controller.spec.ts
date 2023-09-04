import { Test, TestingModule } from '@nestjs/testing';
import { MCatalogController } from './m_catalog.controller';
import { MCatalogService } from './m_catalog.service';

describe('MCatalogController', () => {
  let controller: MCatalogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MCatalogController],
      providers: [MCatalogService],
    }).compile();

    controller = module.get<MCatalogController>(MCatalogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
