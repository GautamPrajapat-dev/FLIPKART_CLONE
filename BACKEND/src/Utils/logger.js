/* eslint-disable no-undef */

import winston, { createLogger, format, transports } from 'winston';
import util from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
const consoleLogFormat = winston.format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info;
    const levels = level.toUpperCase();
    const costomMessage = message;

    const costomMeta = util.inspect(meta, {
        showHidden: false,
        depth: null,
        colors: true
    });
    const costomLog = `${levels} [${timestamp}] ${costomMessage}\n META ${costomMeta}`;
    return costomLog;
});

const consolTransport = () => {
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ];
    }
    return [];
};
const filelogTransport = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info;
    const logmeta = {};
    for (const [key, value] of Object.entries(meta)) {
        if (value instanceof Error) {
            logmeta[key] = JSON.stringify(value);
        } else {
            logmeta[key] = value;
        }
    }
    const logdata = {
        level: level.toUpperCase(),
        message: message,
        timestamp: timestamp,
        meta: logmeta
    };
    return JSON.stringify(logdata, null, 4);
});
const fileTransport = () => {
    const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
    const __dirname = path.dirname(__filename);
    // const logfilename = path.dirname('../', '../', 'logs', `${process.NODE_ENV}.log`);

    return [
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs', `${process.env.NODE_ENV}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), filelogTransport)
        }),
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs', 'combined.log'),
            level: 'info',
            format: format.combine(format.timestamp(), filelogTransport)
        })
    ];
};
export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...fileTransport(), ...consolTransport()]
});
