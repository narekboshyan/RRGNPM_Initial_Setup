import React from 'react';
import clsx from 'clsx';
import { Hidden, IconButton, AppBar, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import HeaderLogo from 'components/Layouts/HeaderLogo';
import HeaderUserbox from 'components/Layouts/HeaderUserbox';

import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { setSidebarToggle, setSidebarToggleMobile } from 'redux/slices/sidebar';

const Header = ({ isCollapsedLayout }) => {
  const {
    sidebar: { sidebarToggleMobile, sidebarToggle },
    common: { headerShadow, headerFixed }
  } = useSelector(state => state);

  const dispatch = useDispatch();

  return (
    <AppBar
      className={clsx('app-header', {
        'app-header-collapsed-sidebar': isCollapsedLayout
      })}
      position={headerFixed ? 'fixed' : 'absolute'}
      elevation={headerShadow ? 11 : 3}
    >
      {!isCollapsedLayout && <HeaderLogo />}
      <Box className="app-header-toolbar">
        <Hidden mdDown>
          <Box className="d-flex align-items-center w-100 ">
            {!isCollapsedLayout && (
              <Box
                className={clsx('btn-toggle-collapse', {
                  'btn-toggle-collapse-closed': sidebarToggle
                })}
              >
                <IconButton
                  color="inherit"
                  onClick={() => dispatch(setSidebarToggle(!sidebarToggle))}
                  size="medium"
                  className="btn-inverse"
                >
                  {sidebarToggle ? <MenuRoundedIcon /> : <MenuOpenRoundedIcon />}
                </IconButton>
              </Box>
            )}
          </Box>
        </Hidden>
        <Box className="d-flex align-items-center  justify-content-end w-100">
          <HeaderUserbox />
          <Box className="toggle-sidebar-btn-mobile">
            <IconButton
              color="inherit"
              onClick={() => dispatch(setSidebarToggleMobile(!sidebarToggleMobile))}
              size="medium"
            >
              {sidebarToggleMobile ? <MenuOpenRoundedIcon /> : <MenuRoundedIcon />}
            </IconButton>
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Header;
