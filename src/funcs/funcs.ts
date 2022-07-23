/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
import cloudinary from 'cloudinary';
import { Model } from 'mongoose';
import axios from 'axios';
import config from 'config';
import FormData from 'form-data';
import { ITurbine } from '../models/turbine.model';
import { IFarm } from '../models/farm.model';
import logger from '../utils/logger';

const VT_API_URL = config.get<string>('VT_API_URL');
const VT_API_KEY = config.get<string>('VT_API_KEY');

export const getDataFromVT = async (formData: FormData) => {
  try {
    const { data: { data: { id } } } = await axios(`${VT_API_URL}/files`, {
      method: 'POST',
      headers: {
        'x-apikey': VT_API_KEY ?? '',
        ...formData.getHeaders(),
      },
      data: formData,
    });

    const { data: { data: { attributes } } } = await axios(`${VT_API_URL}/analyses/${id}`, {
      headers: {
        'x-apikey': VT_API_KEY ?? '',
      },
    });
    const { stats } = attributes;
    return stats;
  } catch (e: any) {
    logger.error({ stack: e.stack }, 'error in saving file', { message: e.toString() });

    return e;
  }
};

export const uploadFileToCloud = async (filePath: string) => {
  try {
    const {
      asset_id: assetId,
      public_id: publicId,
      signature,
      url,
    } = await cloudinary.v2.uploader.upload(filePath);

    logger.info('file uploaded successfully to cloud!');

    return {
      assetId,
      publicId,
      signature,
      url,
    };
  } catch (e: any) {
    logger.error({ stack: e.stack }, 'error in saving file', { message: e.toString() });

    return e;
  }
};

export const upsertDocument = async (
  model: Model<ITurbine | IFarm>,
  assetId: string,
  publicId: string,
  signature: string,
  url: string,
) => {
  try {
    await model.updateOne({ assetId }, {
      assetId, publicId, signature, url,
    }, { upsert: true });
    logger.info('file saved successfully in db!');
  } catch (e: any) {
    logger.error({ stack: e.stack }, 'error in saving file', { message: e.toString() });

    return e;
  }
};

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
    logger.info('file deleted successfully from db!');

    await cloudinary.v2.uploader.destroy(publicId);
    logger.info('file deleted successfully from cloud!');
  } catch (e: any) {
    logger.error({ stack: e.stack }, 'error in deleting document', { message: e.toString() });

    return e;
  }
};
