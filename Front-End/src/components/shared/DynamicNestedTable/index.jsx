import React, { useState } from "react";
import { v4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { FETCH_LOADING_TEXT } from "constants/index";
import RowTableData from "./RowTableData";

const useStyles = makeStyles({
  table: {
    display: "flex",
    justifyContent: "center",
  },
  tableContainer: {},
});

const DynamicNestedTable = ({
  headCells,
  rowData,
  routeStagesHeadCells,
  selectedPO = () => {},
  loading,
}) => {
  const classes = useStyles();
  const [current, setCurrent] = useState(null);

  return (
    <>
      <div className={classes.table}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Typography
            className="font-size-lg px-3 py-4 font-weight-bold"
            variant="h6"
            id="tableTitle"
          >
            Production Orders
          </Typography>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                {headCells.map((cell) => (
                  <TableCell key={cell.id}>{cell.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData.map((row) => (
                <RowTableData
                  key={v4()}
                  row={row}
                  setCurrentEl={setCurrent}
                  currentEl={current}
                  routeStagesHeadCells={routeStagesHeadCells}
                  selectedPO={selectedPO}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default DynamicNestedTable;
