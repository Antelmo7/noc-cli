import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

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

  constructor() {}

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;
    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      return true;
    } catch (error) {
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
