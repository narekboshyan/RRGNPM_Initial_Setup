import React from 'react';
import clsx from 'clsx';

import { useSelector } from 'react-redux';

import { Sidebar, Header } from 'components/Layouts';

const LeftSidebar = ({ children }) => {
  const { sidebarFixed, sidebarToggle } = useSelector(state => state.sidebar);

  return (
    <>
      <div className={clsx('app-wrapper')}>
        <Header />
        <div
          className={clsx('app-main', {
            'app-main-sidebar-static': !sidebarFixed
          })}
        >
          <Sidebar />
          <div
            className={clsx('app-content', {
              'app-content-sidebar-collapsed': sidebarToggle,
              'app-content-sidebar-fixed': sidebarFixed
            })}
          >
            <div className="app-content--inner">
              <div className="app-content--inner__wrapper">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
