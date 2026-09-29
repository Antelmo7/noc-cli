import { LogEntity, LogSeverityLevel } from '../../entities/log.entity.js';
import { LogRepository } from '../../repository/log.repository.js';

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepositories: LogRepository[],
    private readonly successCallback?: SuccessCallback,
    private readonly errorCallback?: ErrorCallback,
  ) {}

  private callLogs(log: LogEntity) {
    this.logRepositories.forEach((logRepository) => logRepository.saveLog(log));
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error on CheckService ${url}`);

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Service ${url} working`,
        timestamp: new Date(),
        origin: 'check-service.ts',
      });

      this.callLogs(log);
      if (this.successCallback) this.successCallback();

      return true;
    } catch (error) {
      const errrorMsg = `[${url}] - ${error}`;
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: errrorMsg,
        timestamp: new Date(),
        origin: 'chec-service.ts',
      });

      this.callLogs(log);
      if (this.errorCallback) this.errorCallback(errrorMsg);

      return false;
    }
  }
}
