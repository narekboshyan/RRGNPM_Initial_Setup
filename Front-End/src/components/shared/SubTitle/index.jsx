import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { GRAY_BLUE_COLOR } from 'constants/index';

const useStyles = makeStyles({
  subTitle: {
    fontStyle: 'normal',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.42,
    letterSpacing: 0.25,
    color: GRAY_BLUE_COLOR,
    textTransform: ({ uppercase }) => (uppercase ? 'uppercase' : 'normal')
  }
});

const SubTitle = ({ className, children, uppercase = true }) => {
  const classes = useStyles({ uppercase });

  return (
    <div className={clsx(classes.subTitle, className)}>
      <span>{children}</span>
    </div>
  );
};

export default SubTitle;
