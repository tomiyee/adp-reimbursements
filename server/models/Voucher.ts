import { model, Schema, SchemaTypes, Types } from 'mongoose';

export type OfficerPosition = string;

interface IVoucher {
  title: string;
  /** The User ID of the creater and owner */
  owner: Types.ObjectId;
  /** A list of LineItem IDs associated with this voucher*/
  lineItems: Types.ObjectId[];
  signatures: Record<OfficerPosition, boolean>;
  completed: boolean;
}

const Voucher = new Schema<IVoucher>({
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    immutable: true,
  },
  lineItems: {
    type: [SchemaTypes.ObjectId],
    required: true,
  },
  signatures: {
    type: Object,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

export default model('Voucher', Voucher);
