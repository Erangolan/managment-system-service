/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import express from 'express';
import config from 'config';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import logger from './utils/logger';
import connect from './utils/connect';
import farmRouter from './routes/farmRouter';
import turbineRouter from './routes/turbineRouter';

const port = config.get<number>('PORT');
const app = express();

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

app.use(
  cors({
    origin: '*',
  }),
);

app.use(express.json());
app.use('/api/farm', farmRouter);
app.use('/api/turbine', turbineRouter);

app.listen(port, async () => {
  logger.info(`server listening on port ${port}`);
  await connect();
});
