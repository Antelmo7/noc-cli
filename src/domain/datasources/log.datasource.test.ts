import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { LogDataSource } from './log.datasource';

describe('log.datasource', () => {
  const newLog = new LogEntity({
    level: LogSeverityLevel.low,
    message: 'Testing abstract LogDataSource class',
    origin: 'log.datasource.test.ts',
  });

  class MockLogDataSource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }

  test('should test the abstract class', async () => {
    const mockLogDatasource = new MockLogDataSource();

    expect(mockLogDatasource).toBeInstanceOf(MockLogDataSource);
    expect(typeof mockLogDatasource.getLogs).toBe('function');
    expect(typeof mockLogDatasource.saveLog).toBe('function');

    await mockLogDatasource.saveLog(newLog);
    const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high);

    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
