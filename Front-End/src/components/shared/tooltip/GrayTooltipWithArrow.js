import { makeStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';
import clsx from 'clsx';
import { DARK_BLUE_COLOR } from 'constants/index';
import React from 'react';

const useStyles = makeStyles({
  grayTooltip: {
    backgroundColor: `${DARK_BLUE_COLOR}b3`,
    borderRadius: 10,
    boxShadow: '0px 4px 4px rgba(8, 35, 48, 0.12)',
    border: 'none',
    pointerEvents: 'none',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: '16px',
    padding: 12
  },
  grayTooltipArrow: {
    '&:before': {
      backgroundColor: `${DARK_BLUE_COLOR}b3`
    }
  }
});

const GrayTooltipWithArrow = ({ title = '', children, classes = {}, ...rest }) => {
  const { tooltip: tooltipClassName = '', arrow: arrowClassName = '', ...classesRest } = classes;
  const styles = useStyles();
  return (
    <Tooltip
      title={title}
      arrow
      classes={{
        tooltip: clsx(styles.grayTooltip, {
          [tooltipClassName]: tooltipClassName
        }),
        arrow: clsx(styles.grayTooltipArrow, {
          [arrowClassName]: arrowClassName
        }),
        ...classesRest
      }}
      {...rest}
    >
      {children}
    </Tooltip>
  );
};

export default GrayTooltipWithArrow;
