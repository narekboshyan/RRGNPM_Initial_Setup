import React from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { IconButton, Box } from '@material-ui/core';

import { useSelector } from 'react-redux';

import projectLogo from 'assets/icons/FlashCo-Logo-White.png';

const HeaderLogo = () => {
  const { sidebarToggle, sidebarHover } = useSelector(state => state.sidebar);
  return (
    <>
      <div
        className={clsx('app-header-logo', {
          'app-header-logo-close': sidebarToggle,
          'app-header-logo-open': sidebarHover
        })}
      >
        <Box className="header-logo-wrapper">
          <Link to="/dashboard" className="header-logo-wrapper-link">
            <IconButton color="primary" size="medium" className="header-logo-wrapper-btn">
              <img className="app-header-logo-img" src={projectLogo} alt="" />
            </IconButton>
          </Link>
        </Box>
      </div>
    </>
  );
};

export default HeaderLogo;

/**      <Link to="/FlashForm.pdf" target="_blank" download>
        Download
      </Link> */
