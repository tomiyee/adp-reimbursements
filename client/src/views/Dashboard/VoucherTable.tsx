import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useRecoilValue } from 'recoil';
import vouchersAtom, {
  voucherSelector,
  voucherTotal,
} from '../../recoil/vouchers';
import Toggle from '../../ui-components/Toggle';

const VoucherTable: React.FC = () => {
  const vouchers = useRecoilValue(vouchersAtom);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>Name</Typography>
            </TableCell>
            <TableCell>
              <Typography>Total</Typography>
            </TableCell>
            <TableCell>
              <Typography>Completed</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vouchers.map((voucher, i) => (
            <VoucherRow key={i} voucherId={voucher.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default VoucherTable;

const VoucherRow: React.FC<{ voucherId: string }> = ({ voucherId }) => {
  const voucher = useRecoilValue(voucherSelector(voucherId));
  if (voucher === undefined)
    throw Error(`No such voucher with the ID: ${voucherId}`);
  const total = useRecoilValue(voucherTotal(voucherId));
  return (
    <TableRow>
      <TableCell>
        <Typography>{voucher.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{total}</Typography>
      </TableCell>
      <TableCell>
        <Toggle
          label="Done"
          value={voucher.completed}
          InputProps={{ disabled: true }}
        />
      </TableCell>
    </TableRow>
  );
};
