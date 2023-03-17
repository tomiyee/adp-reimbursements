import { Paper, Stack, styled, Typography } from '@mui/material';
import _ from 'lodash';
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
  const balance = _.round(getBalance(), 2);

  return (
    <BalanceCard elevation={0}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" color="white">
          Total Outstanding Balance:{' '}
        </Typography>{' '}
        <Typography variant="h5" color="white">
          ${balance}
        </Typography>
      </Stack>
    </BalanceCard>
  );
};

export default Balance;

const BalanceCard = styled(Paper)(({ theme }) =>
  theme.unstable_sx({
    p: 2,
    borderRadius: '1em',
    background: theme.palette.primary.main,
    color: 'white',
  })
);
