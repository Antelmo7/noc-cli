import { FileSystemDataSource } from '../domain/infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../domain/infrastructure/repositories/log.repository';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource(),
);
const emailService = new EmailService();

export class Server {
  public static start() {
    console.log('Server started');

    // new SendEmailLogs(emailService, fileSystemLogRepository).execute(
    //   '',
    // );

    const job = CronService.createJob('*/2 * * * * *', async () => {
      const url = 'https://www.google.com';
      const active = await new CheckService(
        fileSystemLogRepository,
        // () => console.log(`${url} is up`),
        // (error) => console.error(error),
      ).execute(url);
    });
  }
}
