/* eslint-disable import/no-unresolved */
import express from 'express';
import {
  uploadImage,
} from '../controller/farm.controller';

const farmRouter = express.Router();

farmRouter.post('/upload', uploadImage);

export default farmRouter;
