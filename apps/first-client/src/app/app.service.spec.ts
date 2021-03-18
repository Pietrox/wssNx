import { Test } from '@nestjs/testing';

import { FirstClientService } from './first-client.service';

describe('AppService', () => {
  let service: FirstClientService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [FirstClientService]
    }).compile();

    service = app.get<FirstClientService>(FirstClientService);
  });

  describe('getData', () => {
    it('should return "Welcome to first-client!"', () => {
      expect(service.getData()).toEqual({
        message: 'Welcome to first-client!'
      });
    });
  });
});
