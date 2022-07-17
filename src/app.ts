/* eslint-disable no-console */
import express from 'express';
import config from 'config';
import cors from 'cors';
import connect from './utils/connect';

const port = config.get<number>('PORT');
const app = express();

app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());

app.listen(port, async () => {
  console.log(`server listening on port ${port}`);
  await connect();
});
