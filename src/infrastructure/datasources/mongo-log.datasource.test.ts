import mongoose from 'mongoose';
import { envs } from '../../config/plugins/envs.plugin';
import { LogModel, MongoDatabase } from '../../data/mongodb';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { MongoLogDataSource } from './mongo-log.datasource';

describe('mongo-log.datasource', () => {
  const logDataSource = new MongoLogDataSource();

  const log = new LogEntity({
    level: LogSeverityLevel.low,
    message: 'Test message',
    origin: 'mongo-log.datasource.test.ts',
    timestamp: new Date(),
  });

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  afterEach(async () => await LogModel.deleteMany());

  afterAll(async () => mongoose.connection.close());

  beforeEach(() => jest.clearAllMocks());

  test('should create a log', async () => {
    const logSpy = jest.spyOn(console, 'log');

    await logDataSource.saveLog(log);
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('Mongo Log created');
  });

  test('should get logs', async () => {
    await logDataSource.saveLog(log);
    await logDataSource.saveLog(log);
    await logDataSource.saveLog(log);

    const logs = await logDataSource.getLogs(LogSeverityLevel.low);

    expect(logs.length).toBe(3);
    expect(logs[0]?.level).toBe('low');
  });
});
