import { LogEntity, LogSeverityLevel } from './log.entity';

describe('log.entity', () => {
  const dataObj = {
    level: LogSeverityLevel.low,
    message: 'test message',
    origin: 'log.entity.ts',
    timestamp: new Date(),
  };

  test('should create a LogEntity instance', () => {
    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log).toHaveProperty('level');
    expect(log).toHaveProperty('message');
    expect(log).toHaveProperty('origin');
    expect(log).toHaveProperty('timestamp');
    expect(log.level).toBe(dataObj.level);
    expect(log.message).toBe(dataObj.message);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.timestamp).toBeInstanceOf(Date);
  });

  test('should create a LogEntity instance fromJson', () => {
    const log = LogEntity.fromJson(JSON.stringify(dataObj));

    expect(log).toBeInstanceOf(LogEntity);
    expect(log).toHaveProperty('level');
    expect(log).toHaveProperty('message');
    expect(log).toHaveProperty('origin');
    expect(log).toHaveProperty('timestamp');
    expect(log.level).toBe(dataObj.level);
    expect(log.message).toBe(dataObj.message);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.timestamp).toBeInstanceOf(Date);
  });
});
