/* eslint-disable import/no-unresolved */
import express from 'express';
import {
  uploadImage, getAllDocs, getDocById, deleteDoc,
} from '../controller/farm.controller';

const farmRouter = express.Router();

farmRouter.post('/upload', uploadImage);
farmRouter.get('/', getAllDocs);
farmRouter.get('/:id', getDocById);
farmRouter.delete('/:id', deleteDoc);

export default farmRouter;
