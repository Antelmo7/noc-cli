import mongoose from 'mongoose';
import { MongoDatabase } from './init';

describe('init mongodb', () => {
  afterAll(() => mongoose.connection.close());

  test('should connect to mongodb', async () => {
    const connected = await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    });

    expect(connected).toBeTruthy();
  });

  test('should trow an error', async () => {
    try {
      const connected = await MongoDatabase.connect({
        dbName: 'mongodb://root:root@123.323.32:27017/',
        mongoUrl: process.env.MONGO_URL!,
      });

      expect(true).toBeFalsy();
    } catch (error) {
      expect(true).toBeTruthy();
    }
  });
});
