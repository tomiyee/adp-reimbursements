import { atom, selectorFamily } from 'recoil';

export type LineItem = {
  id: string;
  name: string;
  dateIncurred: Date;
  cost: number;
  account: string;
  voucherId: string;
};

const dummyLineItems = [
  {
    id: 'lineItem01',
    name: 'apples',
    cost: 1.99,
    account: 'Fall Food',
    voucherId: 'voucher1',
    dateIncurred: new Date('Aug 26, 2021'),
  },

  {
    id: 'lineItem02',
    name: 'oranges',
    cost: 3.99,
    account: 'Fall Food',
    voucherId: 'voucher1',
    dateIncurred: new Date('Aug 27, 2021'),
  },
  {
    id: 'lineItem03',
    name: 'carrots',
    cost: 1.79,
    account: 'Fall Food',
    voucherId: 'voucher1',
    dateIncurred: new Date('Aug 28, 2021'),
  },
  {
    id: 'lineItem04',
    name: 'paper',
    cost: 1.99,
    account: 'Academic Chair',
    voucherId: 'voucher2',
    dateIncurred: new Date('Sep 2, 2021'),
  },
  {
    id: 'lineItem05',
    name: 'babies',
    cost: 1.99,
    account: 'New Initiatives',
    voucherId: 'voucher2',
    dateIncurred: new Date('Sep 3, 2021'),
  },
  {
    id: 'lineItem06',
    name: 'pencils',
    cost: 1.99,
    account: 'academic chair',
    voucherId: 'voucher2',
    dateIncurred: new Date('Sep 4, 2021'),
  },
];

/**
 * The list of all Line Items the user has access to.
 */
const lineItemsAtom = atom({
  key: 'lineItems',
  default: dummyLineItems as LineItem[],
});

export default lineItemsAtom;

export const lineItemsForVoucher = selectorFamily({
  key: 'lineItemsForVoucher',
  get:
    (voucherId: string) =>
    ({ get }) => {
      const allLineItems = get(lineItemsAtom);
      return allLineItems.filter((each) => each.voucherId === voucherId);
    },
});
