import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { DARK_BLUE_COLOR } from "constants/index";
import MainDialog from "./MainDialog";

const useStyles = makeStyles(() => ({
  mainDialog: {
    lineHeight: "24px",
    color: DARK_BLUE_COLOR,
  },
}));

const ConfirmDialog = ({
  onClose = () => {},
  onConfirm = () => {},
  confirmMessage = "",
  cancelActionText = "No",
  confirmActionText = "Yes",
  cancelActionProps = {},
  confirmActionProps = {},
  onBeforeCancel,
  ...restProps
}) => {
  const classes = useStyles();

  return (
    <MainDialog
      maxWidth="xs"
      onClose={onClose}
      applyDefaultAction={false}
      bodyClass={classes.mainDialog}
      footerActions={
        <>
          <Button
            variant="outlined"
            autoFocus
            onClick={onBeforeCancel || onClose}
            padding="8px 29px"
            {...cancelActionProps}
          >
            {cancelActionText}
          </Button>
          <Button color="secondary" variant="contained" onClick={onConfirm} padding="8px 24px" {...confirmActionProps}>
            {confirmActionText}
          </Button>
        </>
      }
      {...restProps}
    >
      {confirmMessage}
    </MainDialog>
  );
};

export default ConfirmDialog;
