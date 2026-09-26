export enum LogLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export class LogEntity {
  constructor(
    public level: LogLevel,
    public message: string,
    public timestamp: Date,
  ) {}
}
