import { Schema, model } from 'mongoose';

export interface ITurbine {
  assetId: string;
  publicId: string;
  signature?: string;
  url?: string;
}

const turbineSchema = new Schema<ITurbine>({
  assetId: { type: String, required: true },
  publicId: { type: String, required: true },
  signature: String,
  url: String,
});

const Turbine = model<ITurbine>('Turbine', turbineSchema);

export default Turbine;
