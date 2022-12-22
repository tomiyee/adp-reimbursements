import { Stack, Typography } from '@mui/material';
import Balance from './Balance';
import VoucherTable from './VoucherTable';

/**
 *
 */
const DashboardView: React.FC = () => {
  return (
    <Stack>
      <Typography variant="h1">Dashboard</Typography>
      <Balance />
      <VoucherTable />
    </Stack>
  );
};

export default DashboardView;
