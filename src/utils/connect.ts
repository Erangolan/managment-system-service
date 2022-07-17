/* eslint-disable no-console */
import mongoose from 'mongoose';
import config from 'config';

const connect = async () => {
  const dbUri = config.get<string>('DB_URI');
  try {
    await mongoose.connect(dbUri);
    console.log('connected to db');
  } catch (e) {
    console.error('Could not connect to db');
    process.exit(1);
  }
};
export default connect;
