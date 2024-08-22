const fs = require('fs')
const path = require('path')

class Logger {
    constructor(logFile) {
        this.logFilePath = __dirname + `/logs/${logFile}`;
        if (!fs.existsSync(this.logFilePath)) {
            this.initializeLogFile();
        }
    }

    initializeLogFile() {
        fs.writeFileSync(this.logFilePath, '', {flag: 'w'});
    }

    log(message) {
        const formattedMessage = `[${new Date().toISOString()}] ${message}\n`;
        fs.appendFileSync(this.logFilePath, formattedMessage);
    }
}

const logger = new Logger('logs.txt')
logger.initializeLogFile()
module.exports = {logger}