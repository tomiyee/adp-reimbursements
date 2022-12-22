import { model, Schema, Types } from 'mongoose';

export interface ILineItem {
  name: string;
  cost: number;
  account: string;
  dateIncurred: Date;
  voucherId: Types.ObjectId;
  creator: Types.ObjectId;
}

const LineItem = new Schema<ILineItem>({
  dateIncurred: {
    type: Date,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  voucherId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    immutable: true,
  },
});

export default model('LineItem', LineItem);
