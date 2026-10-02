import nodemailer from 'nodemailer';
import { Attachment, EmailService, SendEmailOptions } from './email.service';

describe('first', () => {
  const mockSendEmail = jest.fn();
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendEmail,
  });
  const emailService = new EmailService();

  const attachments: Attachment[] = [
    { filename: 'logs-all.log', path: './logs/logs-all.log' },
    { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
    { filename: 'logs-high.log', path: './logs/logs-high.log' },
  ];

  beforeEach(() => jest.clearAllMocks());

  test('should send email', async () => {
    const options: SendEmailOptions = {
      to: 'test@test.com',
      subject: 'Test',
      htmlBody: '<h1>TEST</h1>',
      attachments: [],
    };

    const sent = await emailService.sendEmail(options);
    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: options.to,
        subject: options.subject,
        html: options.htmlBody,
        attachments: options.attachments,
      }),
    );
  });

  test('should send email with attachments', async () => {
    const options: SendEmailOptions = {
      to: 'test@test.com',
      subject: 'Server Logs',
      htmlBody: `
      <h1>Server Logs</h1>
      <p>Lorem ipsum</p>
      <p>Watch atachments</p>
    `,
    };

    const sent = await emailService.sendEmailWitchFileSystemLogs(options.to);
    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: options.to,
        subject: options.subject,
        html: options.htmlBody,
        attachments: expect.arrayContaining(attachments),
      }),
    );
  });
});
