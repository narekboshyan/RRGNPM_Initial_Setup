import React from 'react';
import clsx from 'clsx';
import { IconButton, Box } from '@material-ui/core';
import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarToggleMobile } from 'redux/slices/sidebar';

const SidebarHeader = () => {
  const {
    sidebar: { sidebarToggleMobile, sidebarToggle, sidebarHover }
  } = useSelector(state => state);

  const dispatch = useDispatch();
  return (
    <>
      <div
        className={clsx('app-sidebar-header', {
          'app-sidebar-header-close': sidebarToggle && !sidebarHover
        })}
      >
        <Box
          className={clsx('app-sidebar-header-btn', {
            'app-sidebar-header-btn-close': sidebarToggle && !sidebarHover
          })}
        >
          <IconButton
            color="inherit"
            onClick={() => dispatch(setSidebarToggleMobile(!sidebarToggleMobile))}
            size="medium"
          >
            {sidebarToggle ? <MenuRoundedIcon /> : <MenuOpenRoundedIcon />}
          </IconButton>
        </Box>
        <Box className="app-sidebar-header-btn-mobile">
          <IconButton
            color="inherit"
            onClick={() => dispatch(setSidebarToggleMobile(!sidebarToggleMobile))}
            size="medium"
          >
            {sidebarToggleMobile ? <MenuOpenRoundedIcon /> : <MenuRoundedIcon />}
          </IconButton>
        </Box>
      </div>
    </>
  );
};
export default SidebarHeader;
