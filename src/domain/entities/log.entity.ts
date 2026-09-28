export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface logEntityOptions {
  level: LogSeverityLevel;
  message: string;
  timestamp?: Date;
  origin: string;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public timestamp: Date | undefined;
  public origin: string;

  constructor(options: logEntityOptions) {
    const { level, message, timestamp, origin } = options;
    this.level = level;
    this.message = message;
    this.timestamp = timestamp;
    this.origin = origin;
  }

  static fromJson = (jsonData: string): LogEntity => {
    const { level, message, timestamp, origin } = JSON.parse(jsonData);
    const realTimestamp = new Date(timestamp);
    const log = new LogEntity({
      level,
      message,
      timestamp,
      origin,
    });

    return log;
  };
}
