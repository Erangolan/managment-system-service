/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { Request, Response } from 'express';
import FormData from 'form-data';
import fs from 'fs';
import { FileRequest } from '../../globals';
import { scanViruses, saveFileData } from '../service/farm.service';
import Farm from '../models/farm.model';
import { getAllDocuments, getDocumentById, deleteDocument } from '../funcs/funcs';
import logger from '../utils/logger';

export const uploadImage = async (req: FileRequest, res: Response) => {
  const { files } = req;
  try {
    const filePath = files?.file.tempFilePath;
    const formData = new FormData();
    const path = fs.createReadStream(filePath);
    formData.append('file', path);

    const attributes = await scanViruses(filePath);

    if (attributes.length) {
      return res.send('vulnerabilities found! proccess stoped');
    }

    logger.info('no vulnerabilities found');

    await saveFileData(filePath);
    return res.send('No weaknesses were found');
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const getAllDocs = async (req: FileRequest, res: Response) => {
  try {
    const farms = await getAllDocuments(Farm);
    return res.json({
      farms,
    });
  } catch (e: any) {
    logger.error({ stack: e.stack }, 'error in fetching data from db', { message: e.toString() });

    return e;
  }
};

export const getDocById = async (req: Request, res: Response) => {
  const { params: { id } } = req;
  try {
    const farm = await getDocumentById(Farm, id);
    return res.json({
      farm,
    });
  } catch (e: any) {
    logger.error({ stack: e.stack }, 'error in fetching data from db', { message: e.toString() });

    return e;
  }
};

export const deleteDoc = async (req: Request, res: Response) => {
  const { params: { id } } = req;
  try {
    await deleteDocument(Farm, id);

    return res.send('file deleted successfully!');
  } catch (e: any) {
    logger.error({ stack: e.stack }, 'error in deleting document', { message: e.toString() });

    return e;
  }
};
