import dayjs from 'dayjs';

const pino = require('pino');
const pretty = require('pino-pretty');

const stream = pretty({
  colorize: true,
  customPrettifiers: {
    time: () => `time: ${dayjs().format()}`,
  },
  ignore: 'pid,hostname',
});
const logger = pino(stream);

export default logger;
