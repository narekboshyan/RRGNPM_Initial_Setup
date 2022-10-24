import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cardRoot: {
    backgroundColor: '#fff',
    boxShadow: '0px 0px 22px rgba(8, 35, 48, 0.12)',
    borderRadius: 15,
    flex: 1,
    width: '100%'
  }
});

const Card = React.forwardRef((props, ref) => {
  const { children, className = '', ...restProps } = props;
  const classes = useStyles();

  return (
    <Paper className={`${classes.cardRoot} ${className}`} {...restProps} ref={ref}>
      {children}
    </Paper>
  );
});

export default Card;
