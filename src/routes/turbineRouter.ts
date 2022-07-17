/* eslint-disable import/no-unresolved */
import express from 'express';
import {
  uploadImage,
} from '../controller/turbine.controller';

const turbineRouter = express.Router();

turbineRouter.post('/upload', uploadImage);

export default turbineRouter;
