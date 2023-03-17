import { AttachFile, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilCallback } from 'recoil';
import lineItemsAtom, { LineItem } from '../../recoil/lineItems';
import vouchersAtom, { Voucher } from '../../recoil/vouchers';
import FloatField from '../../ui-components/FloatField';

const NewVoucherView: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [voucherName, setVoucherName] = useState('');
  const [tempLineItems, setTempLineItems] = useState<LineItem[]>([
    getNewTempLineItem(),
  ]);

  const saveVoucher = useRecoilCallback(({ snapshot, set }) => () => {
    set(lineItemsAtom, (lineItems) => [...lineItems, ...tempLineItems]);
    const newVoucher: Voucher = {
      id: `${Math.random()}`,
      name: voucherName,
      completed: false,
      lineItems: tempLineItems.map((lineItem) => lineItem.id),
      signatures: {},
    };
    set(vouchersAtom, (vouchers) => [...vouchers, newVoucher]);
    navigate('/');
  });

  const validForm =
    voucherName !== '' &&
    tempLineItems.every(
      (lineItem) => lineItem.name !== '' && lineItem.account !== ''
    );

  return (
    <Box maxWidth={'1100px'} marginX={'auto'}>
      <Stack spacing={3}>
        <Typography variant="h2">New Voucher</Typography>
        <Stack spacing={2}>
          <TextField
            value={voucherName}
            onChange={(e) => setVoucherName(e.target.value)}
            label="Name of Voucher (Your eyes only)"
          />
          <TableContainer component={Paper} sx={{ borderRadius: '1em' }}>
            <Table>
              <TableHead style={{ background: theme.palette.primary.main }}>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5" color="white">
                      Date Incurred
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5" color="white">
                      Name of Expense
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5" color="white">
                      Cost
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5" color="white">
                      Account
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5" color="white">
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tempLineItems.map((tempLineItem, i) => (
                  <TableRow key={`line-item-${i}`}>
                    <TableCell>
                      <TextField fullWidth value={tempLineItem.dateIncurred} />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={tempLineItem.name}
                        onChange={(e) => {
                          const newTempLineItems = [...tempLineItems];
                          newTempLineItems[i].name = e.target.value;
                          setTempLineItems(newTempLineItems);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <FloatField
                        fullWidth
                        value={tempLineItem.cost}
                        precision={2}
                        onChange={(newCost) => {
                          const newTempLineItems = [...tempLineItems];
                          newTempLineItems[i].cost = newCost;
                          setTempLineItems(newTempLineItems);
                        }}
                        componentProps={{
                          InputProps: { startAdornment: '$' },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={tempLineItem.account}
                        onChange={(e) => {
                          const newTempLineItems = [...tempLineItems];
                          newTempLineItems[i].account = e.target.value;
                          setTempLineItems(newTempLineItems);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction={'row'} spacing={1}>
                        <Tooltip
                          title={<Typography>Add attachments</Typography>}
                        >
                          <IconButton>
                            <AttachFile />
                          </IconButton>
                        </Tooltip>
                        <IconButton>
                          <Delete
                            onClick={() =>
                              setTempLineItems((old) =>
                                old.filter((e, idx) => idx !== i)
                              )
                            }
                          />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant={'outlined'}
                  onClick={() =>
                    setTempLineItems((old) => [...old, getNewTempLineItem()])
                  }
                >
                  <Typography variant="h5">Add Item</Typography>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  disabled={!validForm}
                  variant={'contained'}
                  onClick={saveVoucher}
                >
                  <Typography variant="h5">Save Voucher</Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default NewVoucherView;

const getNewTempLineItem = () => ({
  id: `${Math.random()}`,
  name: '',
  dateIncurred: new Date(),
  cost: 0,
  account: '',
  voucherId: '',
});
