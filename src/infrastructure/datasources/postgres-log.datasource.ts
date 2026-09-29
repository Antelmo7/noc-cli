import { SeverityLevel } from '../../config/generated/prisma/enums.js';
import { prisma } from '../../data/postgresdb/prisma.js';
import { LogDataSource } from '../../domain/datasources/log.datasource.js';
import {
  LogEntity,
  LogSeverityLevel,
} from '../../domain/entities/log.entity.js';

const severityLevelEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const { level, message, origin } = log;

    // const levelToSave =
    //   level === 'low'
    //     ? 'LOW'
    //     : level === 'medium'
    //       ? 'MEDIUM'
    //       : level === 'high'
    //         ? 'HIGH'
    //         : 'LOW';

    const newLog = await prisma.logModel.create({
      data: {
        level: severityLevelEnum[level],
        message,
        origin,
      },
    });

    console.log('Postgres Log created');
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await prisma.logModel.findMany({
      where: {
        level: severityLevelEnum[severityLevel],
      },
    });

    return logs.map(PostgresLogDataSource.fromObject);
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
