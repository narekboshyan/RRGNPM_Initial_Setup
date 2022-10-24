import { makeStyles } from '@material-ui/core';
import React from 'react';
import { LIGHT_BLUE_COLOR, WHITE_COLOR, DARK_BLUE_COLOR } from 'constants/index';
import Button from '../Button/Button';
import MainDialog from './MainDialog';

const useStyles = makeStyles(() => ({
  mainDialog: {
    lineHeight: '24px',
    color: DARK_BLUE_COLOR
  }
}));

const ConfirmDialog = ({
  onClose = () => {},
  onConfirm = () => {},
  confirmMessage = '',
  cancelActionText = 'No',
  hideDefaultCancelButton = false,
  confirmActionText = 'Yes',
  cancelActionProps = {},
  confirmActionProps = {},
  applyDefaultActions = true,
  footerActions,
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
          {!!footerActions && footerActions}
          {applyDefaultActions && (
            <>
              {!hideDefaultCancelButton && (
                <Button
                  autoFocus
                  bgColor={WHITE_COLOR}
                  borderColor={WHITE_COLOR}
                  textColor={LIGHT_BLUE_COLOR}
                  onClick={onBeforeCancel || onClose}
                  padding="8px 29px"
                  {...cancelActionProps}
                >
                  {cancelActionText}
                </Button>
              )}
              <Button
                data-cy="dialogConfirmButton"
                onClick={onConfirm}
                padding="8px 24px"
                {...confirmActionProps}
              >
                {confirmActionText}
              </Button>
            </>
          )}
        </>
      }
      {...restProps}
    >
      {confirmMessage}
    </MainDialog>
  );
};

export default ConfirmDialog;
