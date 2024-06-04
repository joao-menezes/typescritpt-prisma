import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.colorize(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
    ]
});

export const safePrint = (value: string) => {
    if(typeof value === "object") {
        const stringifiedObject = JSON.stringify(value);
        if (stringifiedObject === "{}") {
            return JSON.stringify(value, Object.getOwnPropertyNames(value))
        }
        return stringifiedObject;
    }
    return value;
}

export default logger;
