import { PrismaClient } from "@prisma/client";
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

  // const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: 'LOW',
  //     message: 'test message',
  //     origin: 'app.ts'
  //   }
  // })
  // console.log({ newLog });

  // const logs = await prisma.logModel.findMany({
  //   where:{level: 'LOW'}
  // });
  // console.log(logs);
  

  ServerApp.start();
}
