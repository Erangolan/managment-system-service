/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
// import { Express, Response } from 'express';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import cloudinary from 'cloudinary';
import config from 'config';
import TurbineModel from '../models/turbine.model';

const VT_API_URL = config.get<string>('VT_API_URL');
const VT_API_KEY = config.get<string>('VT_API_KEY');

export const scanViruses = async (filePath: string) => {
  try {
    const formData = new FormData();
    const path = fs.createReadStream(filePath);
    formData.append('file', path);

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
    const vulnerabilities = Object.entries(stats).filter(([, value]) => value);

    return vulnerabilities;
  } catch (e: any) {
    console.log({ stack: e.stack }, 'error at scanning viruses from vt-api', { message: e.toString() });

    return e;
  }
};

export const saveFileData = async (filePath: string) => {
  try {
    const {
      asset_id: assetId,
      public_id: publicId,
      signature,
      url,
    } = await cloudinary.v2.uploader.upload(filePath);

    console.log('file uploaded successfully to cloud!');

    await TurbineModel.updateOne({ assetId }, {
      assetId, publicId, signature, url,
    }, { upsert: true });

    console.log('file saved successfully in db!');
  } catch (e: any) {
    console.log({ stack: e.stack }, 'error in saving file', { message: e.toString() });

    return e;
  }
};
