import React from 'react';
import { Z_INDEX_INCREASED_FOR_LOADER } from 'constants/index';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  loaderRoot: {
    position: ({ fullScreen }) => (fullScreen ? 'fixed' : 'absolute'),
    display: 'flex',
    zIndex: theme.zIndex.drawer + Z_INDEX_INCREASED_FOR_LOADER,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'default',
    flexDirection: 'column',
    backdropFilter: 'blur(2px)',
    backgroundColor: 'rgba(250, 251, 255, 0.3)',
    fontSize: 20,
    fontWeight: 500
  }
}));

const CircularLoading = ({ fullScreen = true, text = 'Please wait...', open = false }) => {
  const classes = useStyles({ fullScreen });

  if (!open) {
    return null;
  }
  return (
    <div
      className={classes.loaderRoot}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <CircularProgress />
      {text}
    </div>
  );
};
export default CircularLoading;
