import { atom, selectorFamily } from 'recoil';
import { lineItemsForVoucher } from './lineItems';

export type OfficerPosition = string;

export type Voucher = {
  id: string;
  name: string;
  lineItems: string[];
  signatures: Record<OfficerPosition, boolean>;
  completed: boolean;
};

/**
 * The list of all Vouchers that the user has access to
 */
const vouchersAtom = atom({
  key: 'vouchers',
  default: [] as Voucher[],
});

export default vouchersAtom;

export const voucherSelector = selectorFamily({
  key: 'voucher',
  get:
    (voucherId: string) =>
    ({ get }) => {
      return get(vouchersAtom).find((voucher) => voucher.id === voucherId);
    },
});

export const voucherTotal = selectorFamily({
  key: 'voucherTotal',
  get:
    (voucherId: string) =>
    ({ get }) => {
      const lineItems = get(lineItemsForVoucher(voucherId));
      return lineItems
        .map((lineItem) => lineItem.cost)
        .reduce((a, b) => a + b, 0);
    },
});
