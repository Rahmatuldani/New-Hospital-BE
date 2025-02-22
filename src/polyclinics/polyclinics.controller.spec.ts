import { Test, TestingModule } from '@nestjs/testing';
import { PolyclinicsController } from './polyclinics.controller';
import { PolyclinicsService } from './polyclinics.service';

describe('PolyclinicsController', () => {
  let controller: PolyclinicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PolyclinicsController],
      providers: [PolyclinicsService],
    }).compile();

    controller = module.get<PolyclinicsController>(PolyclinicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
