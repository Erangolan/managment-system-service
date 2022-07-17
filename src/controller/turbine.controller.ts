/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { Request, Response } from 'express';
import FormData from 'form-data';
import fs from 'fs';
import { FileRequest } from '../../globals';
import { scanViruses, saveFileData } from '../service/farm.service';

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

    console.log('no vulnerabilities found');

    await saveFileData(filePath);
    return res.send('No weaknesses were found');
  } catch (error) {
    console.log(error);
    return error;
  }
};
