import { LogEntity } from '../../entities/log.entity';
import { CheckService } from './check-service';

describe('check-service.ts', () => {
  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const successCB = jest.fn();
  const errorCB = jest.fn();

  const checkService = new CheckService(mockRepository, successCB, errorCB);

  test('should call success callback when fetch returns true', async () => {
    const wasOK = await checkService.execute('https://google.com');

    expect(wasOK).toBeTruthy();
    expect(successCB).toHaveBeenCalled();
    expect(errorCB).not.toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test('should call error callback when fetch returns false', async () => {
    const wasOK = await checkService.execute(
      'https://fadfsafsafsaf3ef3ghggoogle.com',
    );

    expect(wasOK).toBeFalsy();
    expect(errorCB).toHaveBeenCalled();
    expect(successCB).not.toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
