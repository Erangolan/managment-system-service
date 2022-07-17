import { Schema, model } from 'mongoose';

export interface IFarm {
  assetId: string;
  publicId: string;
  signature?: string;
  url?: string;
}

const userSchema = new Schema<IFarm>({
  assetId: { type: String, required: true },
  publicId: { type: String, required: true },
  signature: String,
  url: String,
});

const Farm = model<IFarm>('Farm', userSchema);

export default Farm;
