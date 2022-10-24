import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    padding: 0,
    margin: 0,
    minWidth: 'unset'
  }
});
const IconButton = ({ icon, className = '', actionName, ...rest }) => {
  const classes = useStyles();
  if (actionName) {
    return null;
  }
  return (
    <Button className={`${classes.root} ${className}`} {...rest}>
      {icon}
    </Button>
  );
};

export default IconButton;
