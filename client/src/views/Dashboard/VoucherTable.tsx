import {
  ArrowDownward,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@mui/icons-material';
import {
  Checkbox,
  Collapse,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { lineItemsForVoucher } from '../../recoil/lineItems';
import vouchersAtom, {
  voucherSelector,
  voucherTotal,
} from '../../recoil/vouchers';

const VoucherTable: React.FC = () => {
  const theme = useTheme();
  const vouchers = useRecoilValue(vouchersAtom);
  return (
    <TableContainer component={Paper} sx={{ borderRadius: '1em' }}>
      <Table>
        <TableHead
          style={{
            background: theme.palette.primary.main,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          <TableRow>
            <TableCell />
            <TableCell>
              <Typography variant="h5" color="white">
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" color="white">
                Total
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" color="white">
                Completed
              </Typography>
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
  const theme = useTheme();
  const [voucher, setVoucher] = useRecoilState(voucherSelector(voucherId));
  if (voucher === undefined)
    throw Error(`No such voucher with the ID: ${voucherId}`);
  const total = useRecoilValue(voucherTotal(voucherId));
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography>{voucher.name}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{total}</Typography>
        </TableCell>
        <TableCell>
          <Checkbox
            value={voucher.completed}
            onChange={(e) =>
              setVoucher({ ...voucher, completed: e.target.checked })
            }
          />
        </TableCell>
      </TableRow>
      <TableRow style={{ background: theme.palette.grey[100] }}>
        <CollapsibleCell colSpan={4}>
          <Collapse in={open} timeout={'auto'} unmountOnExit>
            <VoucherLineItems voucherId={voucherId} />
          </Collapse>
        </CollapsibleCell>
      </TableRow>
    </>
  );
};

const VoucherLineItems: React.FC<{ voucherId: string }> = ({ voucherId }) => {
  const voucher = useRecoilValue(voucherSelector(voucherId));
  if (voucher === undefined)
    throw Error(`No such voucher with the ID: ${voucherId}`);
  const lineItems = useRecoilValue(lineItemsForVoucher(voucher.id));

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {lineItems.map((lineItem) => (
            <TableRow>
              <TableCell>
                <Typography>{lineItem.dateIncurred.toDateString()}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{lineItem.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{lineItem.cost}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{lineItem.account}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CollapsibleCell = styled(TableCell)({ paddingTop: 0, paddingBottom: 0 });
