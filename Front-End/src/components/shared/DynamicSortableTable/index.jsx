import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Toolbar,
  Paper,
  Typography,
  makeStyles,
  TableFooter,
  Button,
  Tooltip
} from '@material-ui/core';
import onDownload from 'helpers/fileDownload';
import IconButton from 'components/shared/Button/IconButton';
import { ReactComponent as ExportIcon } from 'assets/icons/file_export_icon_24.svg';
import EnhancedTableHead from 'components/shared/Table';

import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import Field from 'components/shared/Fields/Field';
import { FIELD_TYPE, FETCH_LOADING_TEXT } from 'constants/index';
import moment from 'moment';
import CircularLoading from 'components/shared/Loading';
import { numberRounderHandler } from 'utils';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  tableBody: {
    position: 'relative'
  },
  noResult: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  },
  leftTableBody: {
    flexGrow: 1
  },
  paper: {
    width: '100%'
  },
  table: {
    minWidth: 500
  },
  leftTableHead: {
    display: 'flex'
  },
  tableContainer: {
    padding: 20,
    paddingTop: 0
  },
  searchField: {
    height: 40,
    width: 320,
    '& .MuiOutlinedInput-input': {
      padding: '10.5px 14px'
    }
  },
  filterRow: {
    display: 'flex',
    minWidth: '60%',
    maxWidth: 680,
    padding: 10,
    gap: 20
  },
  search: {
    padding: '10.5px 0'
  },
  suggestField: {
    width: 300,

    '& .MuiOutlinedInput-input': {
      padding: '10px 14px'
    }
  },
  paginationContent: {
    '&.MuiTableCell-root': {
      padding: '5px 35px 5px  5px'
    }
  },
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 5
  }
}));

const DynamicSortableTable = ({
  headerText = 'Open Orders',
  redirectWIthClick = true,
  redirectRoute = '/order-details/',
  placeholder = 'Search by sales order or cpo',
  tableData = [],
  secondaryAction = false,
  headCells = [],
  disableSortingIcon = false,
  rowDataNames = [],
  exportLoadingText = 'Exporting open orders',
  searchValue = () => {},
  fetchNextPage = () => {},
  exportUrl,
  sort = () => {},
  loading,
  count = 5
}) => {
  const [page, setPage] = useState(0);
  const [exportIsLoading, setExportIsLoading] = useState(false);
  const [searchField, setSearchField] = useState('');
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('DocDueDate');
  const classes = useStyles();
  const history = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => sort(`${orderBy} ${order}`, secondaryAction), [
    sort,
    order,
    orderBy,
    secondaryAction
  ]);

  useEffect(() => {
    const interval = setTimeout(() => {
      searchValue(searchField, secondaryAction);
    }, 500);
    return () => {
      clearTimeout(interval);
    };
  }, [searchField, searchValue, secondaryAction]);

  const pageChangeHandler = e => {
    if (e.target.id === 'next') {
      fetchNextPage(count, secondaryAction);
      setPage(page + 1);
    } else {
      fetchNextPage(-count, secondaryAction);
      setPage(page - 1);
    }
  };

  const exportExcelHandler = async () => {
    setExportIsLoading(true);
    const res = await fetch(exportUrl);
    if (res) {
      setExportIsLoading(false);
    }
    const blobData = await res.blob();
    const downloadUrl = URL.createObjectURL(blobData);
    onDownload(
      downloadUrl,
      `Open_Orders_${moment(new Date().getTime()).format('YYYY-MM-DD')}.xlsx`
    );
  };

  return (
    <Paper className={classes.paper}>
      <CircularLoading
        text={exportIsLoading ? exportLoadingText : FETCH_LOADING_TEXT}
        open={loading || exportIsLoading}
        fullScreen={false}
      />
      <Toolbar className={clsx(classes.root)}>
        <Typography
          className={`${classes.title} font-size-lg py-3 font-weight-bold`}
          variant="h6"
          id="tableTitle"
        >
          {headerText}
        </Typography>
        <Tooltip title="Export Sales orders data" arrow>
          <Button className={classes.exportButton} onClick={exportExcelHandler}>
            <ExportIcon />
          </Button>
        </Tooltip>
      </Toolbar>
      <div className={classes.filterRow}>
        <Field
          value={searchField}
          className={classes.suggestField}
          onChange={e => {
            setSearchField(e.target.value);
            setPage(0);
          }}
          fieldType={FIELD_TYPE.search}
          placeholder={placeholder}
          fullWidth
        />
      </div>
      <TableContainer className={classes.tableContainer}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="custom pagination table"
        >
          <EnhancedTableHead
            classes={classes}
            order={order}
            notShowIcon={disableSortingIcon}
            orderBy={orderBy}
            headCells={headCells}
            onRequestSort={handleRequestSort}
            rowCount={tableData.length}
          />
          <TableBody className={classes.tableBody}>
            {!tableData.length && !loading && (
              <tr className={classes.noResult}>
                <td>No Results are found</td>
              </tr>
            )}

            {tableData.map(row => (
              <TableRow
                hover
                tabIndex={-1}
                key={v4()}
                onClick={() => redirectWIthClick && history.push(`${redirectRoute}${row.DocEntry}`)}
              >
                {rowDataNames.map(rowName => (
                  <TableCell className="cursor-pointer" align="left" key={v4()}>
                    {rowName === 'DocTotal' || rowName === 'PaidToDate'
                      ? `$${numberRounderHandler(row[rowName])}`
                      : row[rowName] || '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {!tableData.length && (
              <TableRow
                style={{
                  height: 53 * 6
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow className={classes.paginationContent}>
              <TableCell className={classes.paginationContent} colSpan={5} align="right">
                <div className={classes.pagination}>
                  <IconButton
                    id="previous"
                    onClick={pageChangeHandler}
                    disabled={page === 0}
                    aria-label="previous page"
                    icon={<KeyboardArrowLeft id="previous" />}
                  />

                  <IconButton
                    id="next"
                    aria-label="next page"
                    onClick={pageChangeHandler}
                    disabled={tableData.length === 0 || tableData.length < count}
                    icon={<KeyboardArrowRight id="next" />}
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DynamicSortableTable;
