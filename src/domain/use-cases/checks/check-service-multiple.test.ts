import { LogEntity } from '../../entities/log.entity';
import { CheckServiceMultiple } from './check-service-multiple';

describe('check-service.ts', () => {
  const mockRepository1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockRepository2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockRepository3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockRepositories = [mockRepository1, mockRepository2, mockRepository3];

  const successCB = jest.fn();
  const errorCB = jest.fn();

  const checkService = new CheckServiceMultiple(
    mockRepositories,
    successCB,
    errorCB,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call success callback when fetch returns true', async () => {
    const wasOK = await checkService.execute('https://google.com');

    expect(wasOK).toBeTruthy();
    expect(successCB).toHaveBeenCalled();
    expect(errorCB).not.toHaveBeenCalled();
    mockRepositories.forEach((mockRepository) =>
      expect(mockRepository.saveLog).toHaveBeenCalledWith(
        expect.any(LogEntity),
      ),
    );
  });

  test('should call error callback when fetch returns false', async () => {
    const wasOK = await checkService.execute(
      'https://fadfsafsafsaf3ef3ghggoogle.com',
    );

    expect(wasOK).toBeFalsy();
    expect(errorCB).toHaveBeenCalled();
    expect(successCB).not.toHaveBeenCalled();
    mockRepositories.forEach((mockRepository) =>
      expect(mockRepository.saveLog).toHaveBeenCalledWith(
        expect.any(LogEntity),
      ),
    );
  });
});
