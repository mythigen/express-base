import fs from 'fs';
import path from 'path';
import morgan from 'morgan';

const logFile = fs.createWriteStream(path.join('__logs__/log-file.log'), { flags: 'a' });

morgan.token('level', (req, res) => {
  const status = res.statusCode;
  if (status >= 500) {
    return 'error';
  } else if (status >= 400) {
    return 'warn';
  } else if (status >= 300) {
    return 'info';
  }
  return 'debug';
});

const fileStream = {
  write: (message: string) => {
    if (message.includes('warn') || message.includes('error')) {
      logFile.write(message);
    }
  },
};

const consoleStream = {
  write: (message: string) => {
    console.log(message.trim());
  },
};

const customFormat = '[:level] :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms :level';

const logger = morgan(customFormat, {
  stream: {
    write: (message) => {
      consoleStream.write(message);
      fileStream.write(message);
    },
  },
});

export default logger;
