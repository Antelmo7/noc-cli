import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepositoryImpl } from './log.repository';

describe('log.repository', () => {
  const mockLogDataSource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const log = new LogEntity({
    level: LogSeverityLevel.low,
    message: 'test message',
    origin: 'log.repository.test.ts',
    timestamp: new Date(),
  });

  beforeEach(() => jest.clearAllMocks());

  test('should call saveLog', () => {
    const logRepository = new LogRepositoryImpl(mockLogDataSource);
    const saveSpy = jest.spyOn(mockLogDataSource, 'saveLog');

    logRepository.saveLog(log);
    expect(saveSpy).toHaveBeenCalledWith(log);
  });

  test('should call getLogs', () => {
    const logRepository = new LogRepositoryImpl(mockLogDataSource);
    const getSpy = jest.spyOn(mockLogDataSource, 'getLogs');

    logRepository.getLogs(LogSeverityLevel.low);
    expect(getSpy).toHaveBeenCalledWith(LogSeverityLevel.low);
  });
});
