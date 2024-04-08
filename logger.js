/**
 * Logger Configuration
 *
 * Configures Winston logger for ASMD microservice.
 *
 * @module logger
 * @requires winston
 */

const winston = require('winston');

/**
 * @typedef {Object} Logger
 * @property {Function} info - Logs an information message.
 * @property {Function} error - Logs an error message.
 */

/**
 * Winston Logger Configuration
 *
 * Configures logger with default log level 'info' to console and files.
 *
 * @type {Logger}
 */
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'ASMD-microservice' },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

module.exports = logger;
