import React from 'react';

import clsx from 'clsx';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getItemFromLocalStorage } from 'utils';
import { SELECTED_COMPANY } from 'constants/index';

const SidebarUserbox = () => {
  const {
    sidebar: { sidebarToggle, sidebarHover },
    user: { user }
  } = useSelector(state => state);

  return (
    <>
      <Box
        className={clsx('app-sidebar-userbox', {
          'app-sidebar-userbox--collapsed': sidebarToggle && !sidebarHover
        })}
      >
        <div className="app-sidebar-userbox-background">
          {user.firstName?.[0]}
          {user.lastName?.[0]}
        </div>
        <Box className="app-sidebar-userbox-name">
          <Box>
            <b className="app-sidebar-userbox-name_info">
              {user.firstName} {user.lastName}
            </b>
          </Box>
          <Box className="app-sidebar-userbox-description">
            <p>{getItemFromLocalStorage(SELECTED_COMPANY)}</p>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SidebarUserbox;
