import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/respositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);
const emailService = new EmailService();

export class ServerApp {
  static start() {
    console.log("Server started...");
    console.log(envs.MONGO_PASS);
    console.log(envs.MONGO_USER);
    
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

    // CronService.createJob("*/5 * * * * *", () => {
    //     // const url = "https://google.com";
    //   const url = "https://localhost:3000";
    //   new CheckService(
    //     fileSystemLogRepository,
    //     undefined, // al ser métodos opcionales es nuestra elección enviar algo u omitirlo(undefined)
    //     undefined,
    //   ).execute(url);
    // });
  }
}
