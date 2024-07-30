

const winston = require('winston')

const {combine,timestamp, json}= winston.format;

const logger = winston.createLogger({
    level: 'info',
    format:combine(
        timestamp(),
        json(),
    ),
    
    // defaultMeta: { service: 'user-service' }, //saber que archivo produjo el error
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
})

// Verifica si el entorno actual no es 'production'
if (process.env.NODE_ENV !== 'production') {
    // Agrega un transporte a la consola para el logger
    logger.add(new winston.transports.Console({
        // Establece el formato del log a un formato simple
        // que muestra solo el nivel del log y el mensaje
        format: winston.format.simple(),
    }));
}


module.exports = function buildLogger(service) {

    return {
        log: (message) => {
            logger.log('info', { message, service });
        },
        error: (message) => {
            logger.error('error', { message, service});
        }
 
    }

};