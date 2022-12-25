import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
  Typography,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import React, { forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import sidebarAtom, { View } from '../../recoil/sidebar';

type NavItemProps = {
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  view: View;
  title: string;
};

/**
 * A single item in the Sdiebar. Provide the icon for the link, the title
 * for the link, and the view it represents. The actual text of the view
 * enum is searched for in the path name
 */
const NavItem: React.FC<NavItemProps> = ({ icon: Icon, view, title }) => {
  const { pathname } = useLocation();
  const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);

  const { selectedView } = sidebarState;

  // When the page initially loads, find the correct view.
  useEffect(() => {
    if (sidebarState.selectedView === view) return;
    // Special case for the Dashboard link
    if (pathname === '/' && view === View.DASHBOARD)
      return setSidebarState({ ...sidebarState, selectedView: view });

    const currentIndex = pathname
      .split('/')
      .findIndex((pathSection) => pathSection === view);
    if (currentIndex === -1) return;
    setSidebarState({ ...sidebarState, selectedView: view });
  }, [pathname, sidebarState, setSidebarState, view]);

  // Renders the component as a Router Link 
  const routerLink = forwardRef(
    (props, ref: React.ForwardedRef<HTMLAnchorElement>) => (
      <Link ref={ref} {...props} to={getPath(view) ?? ''} target={'_self'} />
    )
  );

  return (
    <ListItemButton selected={view === selectedView} component={routerLink}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText
        color="inherit"
        primary={<Typography variant="h5">{title}</Typography>}
      />
    </ListItemButton>
  );
};

export default NavItem;

const getPath = (view: View) => {
  if (view === View.DASHBOARD) return '/';
  if (view === View.VOUCHER) return '/new-voucher';
};
