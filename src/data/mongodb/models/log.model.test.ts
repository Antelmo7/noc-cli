import mongoose from 'mongoose';
import { envs } from '../../../config/plugins/envs.plugin';
import { MongoDatabase } from '../init';
import { LogModel } from './log.model';

describe('LogModel', () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  afterAll(() => mongoose.connection.close());

  test('should return LogModel', async () => {
    const logData = {
      origin: 'log.model.test.ts',
      message: 'Test message',
      level: 'low',
    };

    const log = await LogModel.create(logData);
    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        timestamp: expect.any(Date),
        id: expect.any(String),
      }),
    );

    await LogModel.findOneAndDelete(log.id);
  });

  test('should return the schema object', () => {
    const schema = LogModel.schema.obj;

    expect(schema).toEqual(
      expect.objectContaining({
        level: {
          type: expect.any(Function),
          enum: ['low', 'medium', 'high'],
          default: 'low',
          required: true,
        },
        message: { type: expect.any(Function), required: true },
        timestamp: expect.any(Object),
        origin: { type: expect.any(Function), required: true },
      }),
    );
  });
});
