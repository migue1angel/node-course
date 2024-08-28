import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./database/mongo";
import { ServerApp } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  // const newLog = await LogModel.create({
  //   message: "test message",
  //   origin: "app.ts",
  //   level: "low",
  // });
  // await newLog.save();
  // console.log(newLog);

  const logs = await LogModel.find()
  console.log(logs);
  

  // ServerApp.start();
}
