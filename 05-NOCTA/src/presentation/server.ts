import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/respositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const FileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()

);
const MongoLogRepository = new LogRepositoryImpl(
  new MongoLogDataSource()
);
const PostgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()

);
const emailService = new EmailService();

export class ServerApp {
  static async start() {
    console.log("Server started...");
    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository
    // )
    // emailService.sendEmailWithFileSystemLogs(['maf.chimborazo@yavirac.edu.ec', 'macf06200@gmail.com']);
    // emailService.sendEmail({
    //   to:'maf.chimborazo@yavirac.edu.ec',
    //   subject:'Logs de sistema',
    //   htmlBody:`
    //     <h3> Logs del sistema NOC</h3>
    //     <p>Some paragraph</p>
    //     <p>Ver logs adjuntos</p>

    //   `
    // })

    // const logs = await LogRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://gosdfogle.com";
    //   // const url = "https://localhost:3000";
    //   new CheckServiceMultiple(
    //     [FileSystemLogRepository, PostgresLogRepository, MongoLogRepository],
    //     undefined, // al ser métodos opcionales es nuestra elección enviar algo u omitirlo(undefined)
    //     undefined
    //   ).execute(url);
    // });
  }
}
