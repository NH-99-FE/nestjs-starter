import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!', () => {
      expect(appController.getHello(9)).toBe('Hello World!')
    })
  })
});
