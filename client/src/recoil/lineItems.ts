import { atom, selectorFamily } from 'recoil';

export type LineItem = {
  name: string;
  dateIncurred: Date;
  cost: number;
  account: string;
  voucherId: string;
};

/**
 * The list of all Line Items the user has access to.
 */
const lineItemsAtom = atom({
  key: 'lineItems',
  default: [] as LineItem[],
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
