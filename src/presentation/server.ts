import { CheckService } from '../domain/use-cases/checks/check-service.js';
import { PostgresLogDataSource } from '../infrastructure/datasources/postgres-log.datasource.js';
// import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource.js';
// import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource.js';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.js';
import { CronService } from './cron/cron-service.js';

const logRepository = new LogRepositoryImpl(
  // new FileSystemDataSource(),
  // new MongoLogDataSource(),
  new PostgresLogDataSource(),
);

export class Server {
  public static async start() {
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
