import {
  AppBar,
  Box,
  styled,
  Theme,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import sidebarAtom from '../recoil/sidebar';
import Header from './Header';
import Sidebar, { drawerWidth } from './Sidebar';

const MainLayout: React.FC = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  // We want to adjust the main content if the sidebar is open
  const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
  const sidebarOpen = sidebarState.open;

  useEffect(() => {
    setSidebarState((old) => ({
      ...old,
      drawerOpen: !matchDownMd,
    }));
  }, [setSidebarState, matchDownMd]);

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>
      {/* To position content. See https://github.com/mui/material-ui/issues/16844#issuecomment-517205129 */}
      <Toolbar />

      <Sidebar />

      <Main theme={theme} open={sidebarOpen}>
        <Outlet />
      </Main>
    </Box>
  );
};

export default MainLayout;

const Main = styled('main')(
  ({ theme, open }: { theme: Theme; open: boolean }) => ({
    // On larger screens
    [theme.breakpoints.up('md')]: {
      // Gradual transition whenever the margin changes
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter,
      }),
      marginLeft: open ? drawerWidth : 0,
      width: open ? `calc(100%-${drawerWidth})` : '100vw',
      padding: '32px',
    },
    // On smaller screens
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
    },
  })
);
