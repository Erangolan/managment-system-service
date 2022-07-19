/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import cloudinary from 'cloudinary';
import { Model } from 'mongoose';
import { ITurbine } from '../models/turbine.model';
import { IFarm } from '../models/farm.model';
import logger from '../utils/logger';

export const getAllDocuments = async (model: Model<ITurbine | IFarm>) => {
  try {
    const docs = await model.find({}).lean();
    return docs;
  } catch (e: any) {
    logger.error({ stack: e.stack }, 'error in fetching docs from db', { message: e.toString() });

    return e;
  }
};

export const getDocumentById = async (model: Model<ITurbine | IFarm>, id: string) => {
  try {
    const doc = await model.findOne({ id }).lean();
    return doc;
  } catch (e: any) {
    logger.error({ stack: e.stack }, 'error in fetching data from db', { message: e.toString() });

    return e;
  }
};

export const deleteDocument = async (model: Model<ITurbine | IFarm>, id: string) => {
  try {
    const { publicId }: ITurbine | IFarm = await model.findOneAndDelete({ id }).lean();
    console.info('file deleted successfully from db!');

    await cloudinary.v2.uploader.destroy(publicId);
    console.info('file deleted successfully from cloud!');
  } catch (e: any) {
    logger.error({ stack: e.stack }, 'error in deleting document', { message: e.toString() });

    return e;
  }
};
