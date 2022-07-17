/* eslint-disable import/no-unresolved */
import express from 'express';
import {
  uploadImage, getAllDocs, getDocById, deleteDoc,
} from '../controller/turbine.controller';

const turbineRouter = express.Router();

turbineRouter.post('/upload', uploadImage);
turbineRouter.get('/', getAllDocs);
turbineRouter.get('/:id', getDocById);
turbineRouter.delete('/:id', deleteDoc);

export default turbineRouter;
