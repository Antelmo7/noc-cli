import { LogEntity } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
import { SendEmailLogs } from './send-email-logs';

describe('send-email-logs.ts', () => {
  const mockEmailService = {
    sendEmailWitchFileSystemLogs: jest.fn().mockReturnValue(true),
  };

  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call sendEmail and saveLog', async () => {
    const sent = await sendEmailLogs.execute('test@test.com');

    expect(sent).toBeTruthy();
    expect(mockEmailService.sendEmailWitchFileSystemLogs).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity),
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'low',
        message: 'Log email sent',
        origin: 'send-email-logs.ts',
        timestamp: expect.any(Date),
      }),
    );
  });

  test('should call sendEmail and saveLog with high severity', async () => {
    mockEmailService.sendEmailWitchFileSystemLogs.mockResolvedValue(false);

    const sent = await sendEmailLogs.execute('test@test.com');

    expect(sent).toBeFalsy();
    expect(mockEmailService.sendEmailWitchFileSystemLogs).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity),
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'high',
        message: 'Error: Email log not sent',
        origin: 'send-email-logs.ts',
        timestamp: expect.any(Date),
      }),
    );
  });
});
