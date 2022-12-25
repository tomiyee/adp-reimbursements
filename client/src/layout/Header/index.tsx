import { Stack, Typography } from '@mui/material';

const Header: React.FC = () => {
  return (
    <Stack direction="row" spacing={1}>
      <Typography variant={'h5'}>ADP Voucher Tracker</Typography>
    </Stack>
  );
};

export default Header;
