import express, { Request } from 'express';
import LineItem from '../models/LineItem';

const lineItemRouter = express.Router();

/**
 * Returns a list of all Line Items the user owns
 *
 * @name GET /api/lineItems
 */
lineItemRouter.get('/', async (req, res) => {
  res.status(200).end();
});

type NewLineItemRequest = {
  name: string;
  cost: number;
  account: string;
  dateIncurred: Date;
  voucherId: string;
};

/**
 * Adds a new line Item
 *
 * @name POST /api/lineItems
 *
 * @throws {401} If the user is not logged in
 */
lineItemRouter.post(
  '/',
  async (req: Request<object, object, NewLineItemRequest>, res) => {
    const { name, cost, account, dateIncurred, voucherId } = req.body;

    const lineItem = new LineItem({
      name,
      cost,
      account,
      dateIncurred,
      voucherId,
    });
    await lineItem.save();
    res.status(200).end();
  }
);

/**
 * @name DELETE /api/lineItems/:id?
 *
 * @throws {401} If the user is not logged in or does not own the Line Item
 * @throws {404} If no such Line Item exists
 */
lineItemRouter.delete('/:id?', async (req, res) => {
  await LineItem.findOneAndDelete({ _id: req.params.id });
  res.status(200).end();
});

/**
 * Update values in the specific line item
 *
 * @name PUT /api/lineItems/:id?
 *
 * @param {string?} name - The new item name
 * @param {Date?} date -The new date of the item
 * @param {number?} cost - The new cost of the item
 * @param {string?} account - The new cost of the item
 * @throws {401} If the user is not Logged in or does not own the line item
 * @throws {404} If no such line item exists
 */
lineItemRouter.put('/:id?', async (req, res) => {
  const lineItem = await LineItem.findOne({ _id: req.params.id });
  if (lineItem === null) return res.status(404).end();
  // Update the values if new ones are given
  lineItem.name = req.body.name ?? lineItem.name;
  lineItem.cost = req.body.cost ?? lineItem.cost;
  lineItem.dateIncurred = req.body.date ?? lineItem.dateIncurred;
  lineItem.account = req.body.account ?? lineItem.account;
  return res.status(200).json(lineItem).end();
});

export default lineItemRouter;
