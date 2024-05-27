"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston_1.transports.File({ filename: 'logs/combined.log' })
    ]
});
const safePrint = (value) => {
    if (typeof value === "object") {
        const stringifiedObject = JSON.stringify(value);
        if (stringifiedObject === "{}") {
            return JSON.stringify(value, Object.getOwnPropertyNames(value));
        }
        return stringifiedObject;
    }
    return value;
};
exports.default = logger;
