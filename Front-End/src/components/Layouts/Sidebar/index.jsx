import React from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Hidden, Drawer, Paper, ListItem, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarToggleMobile, setSidebarHover } from 'redux/slices/sidebar';
import SidebarHeader from '../SidebarHeader';
import SidebarUserbox from '../SidebarUserbox';
import { routes } from './navItems';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const dispatch = useDispatch();
  const {
    sidebarToggleMobile,
    sidebarFixed,
    sidebarHover,
    sidebarToggle,
    sidebarUserbox,
    sidebarShadow
  } = useSelector(state => state.sidebar);

  const closeDrawer = () => dispatch(setSidebarToggleMobile(!sidebarToggleMobile));
  const sidebarMenuContent = (
    <div
      className={clsx({
        'app-sidebar-nav-close': sidebarToggle && !sidebarHover
      })}
    >
      {routes.map(({ label, icon: Icon, to }) => (
        <ListItem className={clsx('app-sidebar-item')} disableGutters key={to}>
          <Button
            color="primary"
            disableRipple
            variant="text"
            className={clsx('app-sidebar-button-wrapper')}
            component={Link}
            style={{ paddingLeft: 14 }}
            to={to}
          >
            {Icon && <Icon className="app-sidebar-icon" />}
            {label && <span className="menu-item-label">{label}</span>}
          </Button>
        </ListItem>
      ))}
    </div>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          open={sidebarToggleMobile}
          onClose={closeDrawer}
          variant="temporary"
          elevation={4}
          className="app-sidebar-wrapper-lg"
        >
          <SidebarHeader />
          <PerfectScrollbar>
            {sidebarUserbox && <SidebarUserbox />}
            {sidebarMenuContent}
          </PerfectScrollbar>
        </Drawer>
      </Hidden>

      <Hidden mdDown>
        <Paper
          onMouseEnter={() => dispatch(setSidebarHover(true))}
          onMouseLeave={() => dispatch(setSidebarHover(false))}
          className={clsx('app-sidebar-wrapper', {
            'app-sidebar-wrapper-close': sidebarToggle,
            'app-sidebar-wrapper-open': sidebarHover,
            'app-sidebar-wrapper-fixed': sidebarFixed
          })}
          square
          open={sidebarToggle}
          elevation={sidebarShadow ? 11 : 3}
        >
          <SidebarHeader />
          <div
            className={clsx({
              'app-sidebar-menu': sidebarFixed,
              'app-sidebar-collapsed': sidebarToggle && !sidebarHover
            })}
          >
            <PerfectScrollbar options={{ wheelPropagation: false }}>
              {sidebarUserbox && <SidebarUserbox />}
              {sidebarMenuContent}
            </PerfectScrollbar>
          </div>
        </Paper>
      </Hidden>
    </>
  );
};

export default Sidebar;
