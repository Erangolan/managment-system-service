/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import express from 'express';
import config from 'config';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import connect from './utils/connect';
import farmRouter from './routes/farmRouter';

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

app.listen(port, async () => {
  console.log(`server listening on port ${port}`);
  await connect();
  app.use('/api/farm', farmRouter);
});
