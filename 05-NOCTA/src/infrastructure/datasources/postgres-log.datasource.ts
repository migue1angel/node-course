import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { log } from "console";

const prismaClient = new PrismaClient()

const severityLevelEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}
export class PostgresLogDatasource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
        const level = severityLevelEnum[log.level]
        const newLog = await prismaClient.logModel.create({
            data:{
                ...log,
                level
            }
        })
        console.log('postgres log created');
        
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityLevelEnum[severityLevel]
        const logs = await prismaClient.logModel.findMany({
            where:{level: level}
        })
        return logs.map(LogEntity.fromObject);   
    }

}