import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {


  private readonly transporter = nodemailer.createTransport({
    // cc:['macf06200@gmail.com'],
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });
  
  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { htmlBody, subject, to, attachments = [] } = options;
    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments: attachments,
      });
      console.log(sentInformation);

      return true;
    } catch (error) {
      return false;
    }
  }
  
  sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
    <h3> Logs del sistema NOC</h3>
    <p>Some paragraph</p>
    <p>Ver logs adjuntos</p>
    `;
    const attachments:Attachment[] = [
      {filename:'logs-all.log', path:'./logs/logs-all.log'},
      {filename:'logs-high.log', path:'./logs/logs-high.log'},
      {filename:'logs-medium.log', path:'./logs/logs-medium.log'}
    ]
    return this.sendEmail({
      to,subject,attachments,htmlBody
    })
  }
}
