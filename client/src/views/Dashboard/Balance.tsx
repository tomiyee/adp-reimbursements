import { Paper, Typography } from '@mui/material';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { LineItem, lineItemsForVoucher } from '../../recoil/lineItems';
import vouchersAtom from '../../recoil/vouchers';

const Balance: React.FC = () => {
  const vouchers = useRecoilValue(vouchersAtom);
  const outstandingVouchers = vouchers.filter((voucher) => !voucher.completed);
  const outstandingVoucherIds = outstandingVouchers.map(
    (voucher) => voucher.id
  );
  const getBalance = useRecoilCallback(({ snapshot }) => () => {
    const outstandingLineItems = outstandingVoucherIds.flatMap(
      (voucherId) =>
        snapshot.getLoadable(lineItemsForVoucher(voucherId))
          .contents as LineItem[]
    );
    const outstandingCosts = outstandingLineItems.map(
      (lineItem) => lineItem.cost
    );
    const balance = outstandingCosts.reduce((a, b) => a + b, 0);
    return balance;
  });
  const balance = getBalance();

  return (
    <Paper>
      <Typography>Balance: </Typography> <Typography>{balance}</Typography>
    </Paper>
  );
};

export default Balance;
