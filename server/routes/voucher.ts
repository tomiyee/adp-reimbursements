import express from 'express';
import Voucher from '../models/Voucher';

const voucherRouter = express.Router();

/**
 * List all vouchers the user has access to
 *
 * @name GET /api/vouchers
 *
 * @throws {401} If the user is not logged in
 */
voucherRouter.get('/', async (req, res) => {
  const vouchers = await Voucher.find({});
  res.status(200).json(vouchers).end();
});

/**
 * @name POST /api/vouchers
 *
 * @throws {401} If the user is not logged in
 */
voucherRouter.post('/', async (req, res) => {
  const voucher = new Voucher({});
  await voucher.save();
  res.status(200).end();
});

/**
 * Deletes the Voucher and all associated Line Items
 *
 * @name DELETE /api/vouchers/:id?
 *
 * @param {string} id - The Voucher ID
 * @throws {401} If the user is not logged in or does not own the voucher
 * @throws {404} If no such voucher exists
 */
voucherRouter.delete('/:id?', async (req, res) => {
  await Voucher.deleteOne({ _id: req.params.id });
  res.status(200).end();
});

/**
 * @name PUT /api/vouchers/:id?
 *
 * @param {string} id - The Voucher ID
 * @throws {401} If the user is not logged in or does not own the voucher
 * @throws {404} If no such voucher exists
 */
voucherRouter.put('/:id?', async (req, res) => {
  res.status(200).end();
});
export default voucherRouter;
