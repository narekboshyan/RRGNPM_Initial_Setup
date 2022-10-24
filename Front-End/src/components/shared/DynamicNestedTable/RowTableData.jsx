import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { v4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  issuedQty: {
    backgroundColor: '#71c562'
  },
  routeStagesQty: {
    backgroundColor: '#c1c1c1'
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: '50%'
  }
});

export default function RowTableData({ row }) {
  const classes = useStyles();
  const dots = [];

  for (let i = 0; i < +row.routeStagesQty; i++) {
    if (i < row.issuedQty) {
      dots.push(classes.issuedQty);
    } else {
      dots.push(classes.routeStagesQty);
    }
  }

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {row.itemCode}
      </TableCell>
      <TableCell style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {row.issuedQty}/{row.routeStagesQty}
        {dots.map(color => (
          <span key={v4()} className={clsx(color, classes.dot)} />
        ))}
      </TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.productionOrderId}</TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell>{row.quantity}</TableCell>
      <TableCell>{row.startDate}</TableCell>
      <TableCell>{row.dueDate}</TableCell>
    </TableRow>
  );
}
