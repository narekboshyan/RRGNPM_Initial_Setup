import React from 'react';
import { makeStyles, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    display: 'flex'
  },
  tableHead: {
    display: 'flex',
    flexDirection: 'column'
  },
  tableBody: {
    display: 'flex'
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'column'
  }
});

export default function EnhancedTableHead({
  order = '',
  orderBy = '',
  onRequestSort = () => {},
  headCells = [],
  tableHeadOnTheLeft,
  classNames,
  notShowIcon = false
}) {
  const classes = useStyles();

  const createSortHandler = property => event => {
    if (property === 'productionOrders' || property === 'lines') {
      return;
    }
    onRequestSort(event, property);
  };

  return (
    <>
      <TableHead className={tableHeadOnTheLeft && classes.tableHead}>
        <TableRow className={tableHeadOnTheLeft && classes.tableRow}>
          {headCells.map(headCell => (
            <TableCell
              key={headCell.id}
              align="left"
              sortDirection={orderBy === headCell.id ? order : false}
              className={classNames}
            >
              <TableSortLabel
                align="left"
                hideSortIcon={
                  headCell.id === 'DocEntry' || headCell.id === 'NumAtCard'
                    ? true
                    : false || notShowIcon
                }
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
}
