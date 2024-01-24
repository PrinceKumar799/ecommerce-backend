import { Test, TestingModule } from '@nestjs/testing';
import { Server } from './server';

describe('Server', () => {
  let provider: Server;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Server],
    }).compile();

    provider = module.get<Server>(Server);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
