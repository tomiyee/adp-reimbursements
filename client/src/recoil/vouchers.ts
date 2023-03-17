import _ from 'lodash';
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

const dummyVouchers = [
  {
    id: 'voucher1',
    name: 'August Voucher',
    lineItems: ['lineItem01', 'lineItem02', 'lineItem03'],
    signatures: {},
    completed: false,
  },
  {
    id: 'voucher2',
    name: 'September Voucher',
    lineItems: ['lineItem04', 'lineItem05', 'lineItem06'],
    signatures: {},
    completed: false,
  },
];

/**
 * The list of all Vouchers that the user has access to
 */
const vouchersAtom = atom({
  key: 'vouchers',
  default: dummyVouchers as Voucher[],
});

export default vouchersAtom;

export const voucherSelector = selectorFamily({
  key: 'voucher',
  get:
    (voucherId: string) =>
    ({ get }) => {
      return get(vouchersAtom).find((voucher) => voucher.id === voucherId);
    },
  set:
    (voucherId: string) =>
    ({ set, get }, newValue) => {
      // Delete the voucher
      if (newValue === undefined) {
        set(vouchersAtom, (old) =>
          old.filter((voucher) => voucher.id !== voucherId)
        );
        return;
      }
      // Update the Voucher
      const newVouchers = [...get(vouchersAtom)];
      const idx = newVouchers.findIndex((voucher) => voucher.id === voucherId);
      if (idx === undefined) return;
      newVouchers[idx] = newValue as Voucher;
      set(vouchersAtom, newVouchers);
    },
});

export const voucherTotal = selectorFamily({
  key: 'voucherTotal',
  get:
    (voucherId: string) =>
    ({ get }) => {
      const lineItems = get(lineItemsForVoucher(voucherId));
      const total = lineItems
        .map((lineItem) => lineItem.cost)
        .reduce((a, b) => a + b, 0);
      return _.round(total, 2);
    },
});
