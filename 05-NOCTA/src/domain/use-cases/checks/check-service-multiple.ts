import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccesCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  private origin: string = "check-service.ts";
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly succesCallback: SuccesCallback,
    private readonly errorCallback: ErrorCallback
  ) { }

  private callLogRepositories(log: LogEntity) {
    this.logRepository.forEach(repository => {
      repository.saveLog(log)
    })
  }

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check serverice ${url}`);
      }
      const log = new LogEntity({
        message: `service ${url} working`,
        level: LogSeverityLevel.low,
        origin: this.origin,
      });
      this.callLogRepositories(log);
      this.succesCallback && this.succesCallback();
      return true;
    } catch (error) {
      const errorMessage = `${error}`;
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: this.origin,
      });
      this.callLogRepositories(log);
      this.errorCallback && this.errorCallback(errorMessage);

      return false;
    }
  }
}
