import { Schema, model } from 'mongoose';

export interface IExample {
  name: string;
}

const exampleSchema = new Schema<IExample>({
  name: { type: String, required: true },
});

const Example = model<IExample>('Example', exampleSchema);

export default Example;
