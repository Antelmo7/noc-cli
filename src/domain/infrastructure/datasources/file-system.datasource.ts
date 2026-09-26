import fs from 'node:fs';
import { LogDataSource } from '../../datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath: string = 'logs';
  private readonly allLogsPath: string = 'logs/logs-all.log';
  private readonly mediumLogsPath: string = 'logs/logs-medium.log';
  private readonly highLogsPath: string = 'logs/logs-high.log';

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

  async saveLog(log: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(log)}\n`;
    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (log.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
    } else if (log.level === LogSeverityLevel.high) {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error('Method not implemented.');
  }
}
