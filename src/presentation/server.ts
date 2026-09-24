import { CronService } from './cron/cron-service';

export class Server {
  public static start() {
    console.log('Server started');
    const job = CronService.createJob('*/2 * * * * *', () => {
      const date = new Date();
      console.log('2 second', date);
    });

    CronService.createJob('*/5 * * * * *', () => {
      const date = new Date();
      console.log('5 second', date);
    });

    CronService.createJob('*/3 * * * * *', () => {
      const date = new Date();
      console.log('3 second', date);
    });
  }
}
