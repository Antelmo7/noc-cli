import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error on CheckService ${url}`);

      const log = new LogEntity(
        LogSeverityLevel.low,
        `Service ${url} working`,
        new Date(),
      );

      this.logRepository.saveLog(log);
      this.successCallback();

      return true;
    } catch (error) {
      const errrorMsg = `[${url}] - ${error}`;
      const log = new LogEntity(LogSeverityLevel.high, errrorMsg, new Date());

      this.logRepository.saveLog(log);
      this.errorCallback(errrorMsg);

      return false;
    }
  }
}
