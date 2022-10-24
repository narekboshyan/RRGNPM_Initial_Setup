import React from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Paper,
  makeStyles,
  TableHead,
  Typography
} from '@material-ui/core';
import { numberRounderHandler } from 'utils';
import { FETCH_LOADING_TEXT } from 'constants/index';
import CircularLoading from 'components/shared/Loading';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  fontWeight: {
    fontWeight: 900
  },
  headerText: {
    paddingLeft: 16
  }
});

const TableHeadLeft = ({ data, price, loading }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <CircularLoading text={FETCH_LOADING_TEXT} open={loading} fullScreen={false} />
      <Typography
        className={`${classes.headerText} font-size-lg py-4 font-weight-bold`}
        variant="h6"
        id="tableTitle"
      >
        Order #{data.salesOrder}
      </Typography>
      <Table
        className={classes.table}
        aria-labelledby="tableTitle"
        size="medium"
        aria-label="enhanced table"
      >
        <TableHead>
          <TableRow>
            <TableCell> Customer PO </TableCell>
            <TableCell>{data.customerPo}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell> Sales Order </TableCell>
            <TableCell>{data.salesOrder}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell> Ship Date</TableCell>
            <TableCell>{data.shipDate}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Production Order Count</TableCell>
            <TableCell>{data.POCount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeight}> Total Price </TableCell>
            <TableCell className={classes.fontWeight}>${numberRounderHandler(price)}</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default TableHeadLeft;
