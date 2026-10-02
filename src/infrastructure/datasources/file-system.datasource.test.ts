import fs from 'node:fs';
import path from 'node:path';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { FileSystemDataSource } from './file-system.datasource';

describe('file-system.datasource', () => {
  const logsPath = path.join(__dirname, '../../../logs');
  beforeEach(() => {
    fs.rmSync(logsPath, { recursive: true, force: true });
  });

  test('should create logs files if they dont exist', () => {
    new FileSystemDataSource();
    const pathExists = fs.existsSync(logsPath);
    const files = fs.readdirSync(logsPath);

    expect(pathExists).toBeTruthy();
    expect(files).toEqual(
      expect.arrayContaining([
        'logs-all.log',
        'logs-high.log',
        'logs-medium.log',
      ]),
    );
  });

  test('should save a log in logs-all.log', async () => {
    const logDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: 'test message',
      origin: 'file-system-datasource.test.ts',
      timestamp: new Date(),
    });

    logDataSource.saveLog(log);
    const allLogs = fs.readFileSync(
      path.join(logsPath, 'logs-all.log'),
      'utf-8',
    );

    expect(allLogs).toContain(JSON.stringify(log));
  });

  test('should save a log in logs-medium.log', async () => {
    const logDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogSeverityLevel.medium,
      message: 'test message',
      origin: 'file-system-datasource.test.ts',
      timestamp: new Date(),
    });

    logDataSource.saveLog(log);
    const allLogs = fs.readFileSync(
      path.join(logsPath, 'logs-medium.log'),
      'utf-8',
    );

    expect(allLogs).toContain(JSON.stringify(log));
  });

  test('should save a log in logs-high.log', async () => {
    const logDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogSeverityLevel.high,
      message: 'test message',
      origin: 'file-system-datasource.test.ts',
      timestamp: new Date(),
    });

    logDataSource.saveLog(log);
    const allLogs = fs.readFileSync(
      path.join(logsPath, 'logs-high.log'),
      'utf-8',
    );

    expect(allLogs).toContain(JSON.stringify(log));
  });

  test('should return all logs in logs-all.log', async () => {
    const logDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: 'test message',
      origin: 'file-system-datasource.test.ts',
      timestamp: new Date(),
    });

    logDataSource.saveLog(log);
    const allLogs = await logDataSource.getLogs(LogSeverityLevel.low);

    expect(allLogs).toEqual(expect.arrayContaining([log]));
  });

  test('should return all logs in logs-medium.log', async () => {
    const logDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogSeverityLevel.medium,
      message: 'test message',
      origin: 'file-system-datasource.test.ts',
      timestamp: new Date(),
    });

    logDataSource.saveLog(log);
    const allLogs = await logDataSource.getLogs(LogSeverityLevel.medium);

    expect(allLogs).toEqual(expect.arrayContaining([log]));
  });

  test('should return all logs in logs-high.log', async () => {
    const logDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogSeverityLevel.high,
      message: 'test message',
      origin: 'file-system-datasource.test.ts',
      timestamp: new Date(),
    });

    logDataSource.saveLog(log);
    const allLogs = await logDataSource.getLogs(LogSeverityLevel.high);

    expect(allLogs).toEqual(expect.arrayContaining([log]));
  });

  test('should throw an error', async () => {
    const logDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogSeverityLevel.high,
      message: 'test message',
      origin: 'file-system-datasource.test.ts',
      timestamp: new Date(),
    });

    logDataSource.saveLog(log);
    try {
      const allLogs = await logDataSource.getLogs('critical' as any);
      expect(true).toBeFalsy();
    } catch (error) {
      expect(`${error}`).toBe('Error: critical not implemented');
    }
  });
});
