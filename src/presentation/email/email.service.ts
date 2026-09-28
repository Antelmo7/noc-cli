import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

// todo: atachments

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor(private readonly logRepository: LogRepository) {}

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;
    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      console.log(sentInformation);

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Email Sent',
        timestamp: new Date(),
        origin: 'email.service.ts',
      });
      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'Email Not Sent',
        timestamp: new Date(),
        origin: 'email.service.ts',
      });
      this.logRepository.saveLog(log);

      return false;
    }
  }

  async sendEmailWitchFileSystemLogs(to: string | string[]): Promise<boolean> {
    const subject = 'Server Logs';
    const htmlBody = `
      <h1>Server Logs</h1>
      <p>Lorem ipsum</p>
      <p>Watch atachments</p>
    `;

    const attachments: Attachment[] = [
      { filename: 'logs-all.log', path: './logs/logs-all.log' },
      { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
      { filename: 'logs-high.log', path: './logs/logs-high.log' },
    ];

    return this.sendEmail({
      to,
      subject,
      htmlBody,
      attachments,
    });
  }
}
