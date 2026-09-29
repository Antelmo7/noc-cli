import { envs } from './config/plugins/envs.plugin.js';
import { MongoDatabase } from './data/mongodb/index.js';
import { Server } from './presentation/server.js';

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  Server.start();
}
