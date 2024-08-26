import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/respositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class ServerApp {
  static start() {
    console.log("Server started...");

    CronService.createJob("*/5 * * * * *", () => {
        const url = "https://google.com";
    //   const url = "https://localhost:3000";
      new CheckService(
        fileSystemLogRepository,
        undefined, // al ser métodos opcionales es nuestra elección enviar algo u omitirlo(undefined)
        undefined,
      ).execute(url);
    });
  }
}
