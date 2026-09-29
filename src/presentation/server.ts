import { CheckService } from '../domain/use-cases/checks/check-service';
// import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository';
import { CronService } from './cron/cron-service';

const logRepository = new LogRepositoryImpl(
  // new FileSystemDataSource()
  new MongoLogDataSource(),
);

export class Server {
  public static start() {
    console.log('Server started');

    // new SendEmailLogs(emailService, fileSystemLogRepository).execute(
    //   '',
    // );

    const job = CronService.createJob('*/2 * * * * *', async () => {
      const url = 'https://www.google.com';
      const active = await new CheckService(
        logRepository,
        // () => console.log(`${url} is up`),
        // (error) => console.error(error),
      ).execute(url);
    });
  }
}
