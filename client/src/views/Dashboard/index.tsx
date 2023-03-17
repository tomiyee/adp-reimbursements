import { Box, Stack, Typography } from '@mui/material';
import Balance from './Balance';
import VoucherTable from './VoucherTable';

/**
 *
 */
const DashboardView: React.FC = () => {
  return (
    <Box maxWidth={'1100px'} marginX={'auto'}>
      <Stack spacing={3}>
        <Typography variant="h2">Dashboard</Typography>
        <Balance />
        <VoucherTable />
      </Stack>
    </Box>
  );
};

export default DashboardView;
