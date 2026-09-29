import { LogModel } from '../../data/mongodb/index.js';
import { LogDataSource } from '../../domain/datasources/log.datasource.js';
import {
  LogEntity,
  LogSeverityLevel,
} from '../../domain/entities/log.entity.js';

export class MongoLogDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create({
      level: log.level,
      message: log.message,
      origin: log.origin,
    });
    await newLog.save();

    console.log('Mongo Log created', newLog);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({
      level: severityLevel,
    });

    return logs.map(MongoLogDataSource.fromObject);
  }

  static fromObject(object: { [key: string]: any }): LogEntity {
    const { level, message, origin, timestamp } = object;

    const log = new LogEntity({
      level,
      message,
      origin,
      timestamp,
    });

    return log;
  }
}
