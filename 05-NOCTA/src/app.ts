import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./database/mongo";
import { ServerApp } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });



  ServerApp.start();
}
