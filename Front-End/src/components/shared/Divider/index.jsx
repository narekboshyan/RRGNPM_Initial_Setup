import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { GRAY_COLOR } from 'constants/index';
import React from 'react';

const useStyles = makeStyles({
  divider: {
    width: 'inherit',
    height: 1,
    backgroundColor: ({ bgColor }) => bgColor,
    margin: ({ top = 22, bottom = 22, left = 0, right = 0 }) =>
      `${top}px ${right}px ${bottom}px ${left}px`
  },
  verticalDivider: {
    width: 1,
    height: ({ height }) => height,
    backgroundColor: ({ bgColor }) => bgColor,
    margin: ({ top = 0, bottom = 0, left = 24, right = 24 }) =>
      `${top}px ${right}px ${bottom}px ${left}px`
  }
});

const Divider = ({
  className,
  top,
  bottom,
  left,
  right,
  height = 40,
  mode = 'horizontal',
  bgColor = GRAY_COLOR
}) => {
  const classes = useStyles({ top, bottom, left, right, height, bgColor });

  return (
    <div
      className={clsx(mode === 'horizontal' ? classes.divider : classes.verticalDivider, className)}
    />
  );
};

export default Divider;
