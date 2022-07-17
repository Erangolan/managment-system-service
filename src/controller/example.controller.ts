/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import { Request, Response } from "express";

export const example = async (req: Request, res: Response) => {
  try {
    const word = 'bla';
    return res.send(word);
  } catch (e) {
    console.log({ stack: e.stack }, 'error in ..', { message: e.toString() });

    return e;
  }
};
