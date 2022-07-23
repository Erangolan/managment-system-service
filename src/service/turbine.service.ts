/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
import FormData from 'form-data';
import fs from 'fs';
import TurbineModel from '../models/turbine.model';
import logger from '../utils/logger';
import { uploadFileToCloud, upsertDocument, getDataFromVT } from '../funcs/funcs';

export const scanViruses = async (filePath: string) => {
  try {
    const formData = new FormData();
    const path = fs.createReadStream(filePath);
    formData.append('file', path);

    const stats = await getDataFromVT(formData);
    const vulnerabilities = Object.entries(stats).filter(([, value]) => value);

    return vulnerabilities;
  } catch (e: any) {
    logger.error({ stack: e.stack }, 'error at scanning viruses from vt-api', { message: e.toString() });

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
    } = await uploadFileToCloud(filePath);

    await upsertDocument(TurbineModel, assetId, publicId, signature, url);
  } catch (e: any) {
    logger.error({ stack: e.stack }, 'error in saving file', { message: e.toString() });

    return e;
  }
};
