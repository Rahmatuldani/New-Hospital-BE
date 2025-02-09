import { Test, TestingModule } from '@nestjs/testing';
import { PatientsGateway } from './patients.gateway';

describe('PatientsGateway', () => {
  let gateway: PatientsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientsGateway],
    }).compile();

    gateway = module.get<PatientsGateway>(PatientsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
