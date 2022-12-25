import { FileCopy, Home } from '@mui/icons-material';
import {
  Box,
  Drawer,
  Stack,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRecoilState } from 'recoil';
import sidebarAtom, { View } from '../../recoil/sidebar';
import NavItem from './NavItem';

export const drawerWidth = '280px';

/**
 * The expandable Drawer in the left side of the browser.
 */
const Sidebar: React.FC = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
  const closeHandler = () =>
    setSidebarState((old) => ({ ...old, open: !sidebarState.open }));

  return (
    <Box component="nav">
      <StyledDrawer
        anchor="left"
        open={sidebarState.open}
        onClose={closeHandler}
        variant={matchUpMd ? 'persistent' : 'temporary'}
      >
        <Box paddingX="16px" paddingTop={'16px'}>
          <Stack spacing={1}>
            <NavItem view={View.DASHBOARD} icon={Home} title="Dashboard" />
            <NavItem view={View.VOUCHER} icon={FileCopy} title="New Voucher" />
          </Stack>
        </Box>
      </StyledDrawer>
    </Box>
  );
};

export default Sidebar;

const StyledDrawer = styled(Drawer)(({ theme }) =>
  theme.unstable_sx({
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      top: '70px',
    },
  })
);
