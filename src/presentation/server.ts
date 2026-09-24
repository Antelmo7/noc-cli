import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cron-service';

export class Server {
  public static start() {
    console.log('Server started');
    const job = CronService.createJob('*/2 * * * * *', async () => {
      const active = await new CheckService().execute('https://www.google.com');
    });
  }
}
