import winston, { createLogger, format, transports } from 'winston'
import util from 'util'
const consoleLogFormat = winston.format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info
    const levels = level.toUpperCase()
    const costomMessage = message

    const costomMeta = util.inspect(meta, {
        showHidden: false,
        depth: null,
        colors: true
    })
    const costomLog = `${levels} [${timestamp}] ${costomMessage}\n META ${costomMeta}`
    return costomLog
})

const consolTransport = () => {
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ]
    }
    return []
}

export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...consolTransport()]
})
