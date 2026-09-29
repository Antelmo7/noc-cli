import { EmailService } from '../../../presentation/email/email.service.js';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity.js';
import { LogRepository } from '../../repository/log.repository.js';

interface SendEmailLogsUseCase {
  execute: (to: string) => Promise<boolean>;
}

export class SendEmailLogs implements SendEmailLogsUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ) {}
  async execute(to: string): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWitchFileSystemLogs(to);
      if (!sent) throw new Error('Email log not sent');

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Log email sent',
        timestamp: new Date(),
        origin: 'send-email-logs.ts',
      });

      this.logRepository.saveLog(log);
      return sent;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `${error}`,
        timestamp: new Date(),
        origin: 'send-email-logs.ts',
      });

      this.logRepository.saveLog(log);
      return false;
    }
  }
}
