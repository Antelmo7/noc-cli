import fs from 'node:fs';
import { LogDataSource } from '../../datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath: string = 'logs';
  private readonly allLogsPath: string = 'logs/logs-low-priority.log';
  private readonly mediumLogsPath: string = 'logs/logs-medium-priority.log';
  private readonly highLogsPath: string = 'logs/logs-high-priority.log';

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (!fs.existsSync(path)) {
          fs.writeFileSync(path, '');
        }
      },
    );
  };

  saveLog(log: LogEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error('Method not implemented.');
  }
}
