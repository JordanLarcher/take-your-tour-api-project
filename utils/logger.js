const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors, colorize } = format;

// Define customize log formats
const thisFormat = printf(( { level,message, timestamp, stack } ) => {
    return `${timestamp} - ${level}: ${stack || message}`;
})

// Create logger
const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp( { format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true } ),
        thisFormat
    ),
    transports: [
        new transports.File( { filename: 'logs/error.log', level: 'error'} ),
        new transports.File( { filename: 'logs/combined.log'} )
    ],
});

if( process.env.NODE_ENV !== 'production' ) {
    logger.add(new transports.Console({
        format: combine(
            colorize(),
            timestamp( {format: 'HH:mm:ss' }),
            thisFormat
        )
    }));
}

module.exports = logger;