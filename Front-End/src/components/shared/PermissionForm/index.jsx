import { Checkbox, FormControl, FormControlLabel, FormGroup, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  formControl: {
    margin: '0 5px'
  }
}));

const PermissionForm = ({ id, permissionHandler, initialValues = {} }) => {
  const { canReadOrders, canReadInvoices, canReadQuotes } = initialValues;
  const classes = useStyles();

  const checkboxHandler = e => {
    permissionHandler(
      {
        ...initialValues,
        [e.target.id]: e.target.checked
      },
      id
    );
  };

  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              id="canReadQuotes"
              checked={canReadQuotes}
              onChange={checkboxHandler}
            />
          }
          label="Quotes"
          className={classes.formControl}
          labelPlacement="top"
        />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              id="canReadOrders"
              checked={canReadOrders}
              onChange={checkboxHandler}
            />
          }
          label="Orders"
          className={classes.formControl}
          labelPlacement="top"
        />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              id="canReadInvoices"
              checked={canReadInvoices}
              onChange={checkboxHandler}
            />
          }
          label="Invoices"
          className={classes.formControl}
          labelPlacement="top"
        />
      </FormGroup>
    </FormControl>
  );
};

export default PermissionForm;
