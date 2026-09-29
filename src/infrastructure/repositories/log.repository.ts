import { LogDataSource } from '../../domain/datasources/log.datasource.js';
import {
  LogEntity,
  LogSeverityLevel,
} from '../../domain/entities/log.entity.js';
import { LogRepository } from '../../domain/repository/log.repository.js';

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logDataSource: LogDataSource) {}

  async saveLog(log: LogEntity): Promise<void> {
    this.logDataSource.saveLog(log);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(severityLevel);
  }
}
