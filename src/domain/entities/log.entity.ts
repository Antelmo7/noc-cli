export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export class LogEntity {
  constructor(
    public level: LogSeverityLevel,
    public message: string,
    public timestamp: Date,
  ) {}

  static fromJson = (jsonData: string): LogEntity => {
    const { level, message, timestamp } = JSON.parse(jsonData);
    const log = new LogEntity(level, message);
    log.timestamp = new Date(timestamp);

    return log;
  };
}
