import { model, Schema, Types } from 'mongoose';

interface IUser {
  firstName: string;
  lastName: string;
  payableTo: string;
  vouchers: Types.ObjectId[];
}

const User = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  payableTo: {
    type: String,
    required: true,
  },
  vouchers: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
});

export default model('User', User);
