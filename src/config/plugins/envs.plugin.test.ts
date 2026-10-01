import { envs } from './envs.plugin';

describe('envs', () => {
  test('should return envs options', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'test@test.com',
      MAILER_SECRET_KEY: 'wsictvrbnbeodyfd',
      PROD: false,
      MONGO_URL: 'mongodb://root:root@localhost:27017/',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'root',
      MONGO_PASS: 'root',
      POSTGRES_URL: 'postgresql://root:root@localhost:5433/NOC-TEST',
      POSTGRES_DB_NAME: 'NOC-TEST',
      POSTGRES_USER: 'root',
      POSTGRES_PASS: 'root',
    });
  });

  test('should return error if not found env', async () => {
    jest.resetModules();
    process.env.PORT = 'ABC';

    try {
      await import('./envs.plugin');
      expect(true).toBeFalsy();
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
