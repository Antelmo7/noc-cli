import { FileSystemDataSource } from '../domain/infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../domain/infrastructure/repositories/log.repository';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cron-service';

const logRepository = new LogRepositoryImpl(new FileSystemDataSource());

export class Server {
  public static start() {
    console.log('Server started');
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
