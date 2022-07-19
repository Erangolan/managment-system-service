/* eslint-disable no-console */
import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

const connect = async () => {
  const dbUri = config.get<string>('DB_URI');
  try {
    await mongoose.connect(dbUri);
    logger.info('connected to db');
  } catch (e) {
    logger.error('Could not connect to db');
    process.exit(1);
  }
};
export default connect;
