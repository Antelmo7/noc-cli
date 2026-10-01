import { MongoDatabase } from './init';

describe('init mongodb', () => {
  test('should connect to mongodb', async () => {
    const connected = await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    });

    expect(connected).toBeTruthy();
  }, 10000);
});
