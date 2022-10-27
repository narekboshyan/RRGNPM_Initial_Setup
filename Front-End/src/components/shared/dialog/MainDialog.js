import React from "react";
import clsx from "clsx";
import { Button, Dialog, DialogActions, DialogContent, makeStyles, useMediaQuery } from "@material-ui/core";
import IconButton from "components/shared/Button/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ReactComponent as CloseIcon } from "assets/icons/close_small_icon.svg";
import { ReactComponent as SaveIcon } from "assets/icons/content-save.svg";
import { ReactComponent as ArrowBackIcon } from "assets/icons/back.svg";
import { useStepStyles } from "styles/Step";
import { DARK_BLUE_COLOR, LIGHTEN_GRAY_COLOR, MOBILE_LAYOUT_WIDTH_BREAKPOINT } from "constants/index";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  backdrop: {
    backgroundColor: `${DARK_BLUE_COLOR}80`,
    backdropFilter: "blur(2px)",
  },
  dialogPaper: {
    borderRadius: ({ applyMobileLayout }) => (applyMobileLayout ? 0 : 8),
  },
  dialogTitle: {
    position: "relative",
  },
  dialogCloseIcon: {
    position: "absolute",
    right: 14,
    cursor: "pointer",
  },
  backBtn: {
    marginRight: 8,
  },
  spacing: {
    "& > :not(:first-child)": {
      marginLeft: 16,
    },
  },
  paperWidthMd: {
    maxWidth: 1110,
  },
  paperWidthSm: {
    maxWidth: 684,
  },
  paperWidthXs: {
    maxWidth: 448,
  },
  downloadButton: {
    background: "blue",
    width: "100%",
    height: "100%",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: 8,
  },
});

const MainDialog = ({
  onClose = () => {},
  closable = true,
  closeIcon,
  title = "",
  open = true,
  paperClassName = "",
  footerActions,
  applyDefaultAction = true,
  applySecondaryAction = false,
  onDefaultAction = () => {},
  defaultActionText = "",
  secondaryActionText = "Cancel",
  applyBack = false,
  onBack = () => {},
  children,
  bodyClass = "",
  defaultActionIcon = <SaveIcon />,
  headerClassName = "",
  defaultActionProps = {},
  secondaryActionProps = {},
  downloadAction = false,
  maxWidth = "sm",
  ...restProps
}) => {
  const applyMobileLayout = useMediaQuery(`(max-width:${MOBILE_LAYOUT_WIDTH_BREAKPOINT}px)`);
  const classes = useStyles({ applyMobileLayout });
  const stepClasses = useStepStyles({ applyMobileLayout });

  const dialogClassesRegardingMaxWidthProp = {
    md: { paperWidthMd: classes.paperWidthMd },
    sm: { paperWidthSm: classes.paperWidthSm },
    xs: { paperWidthXs: classes.paperWidthXs },
  };

  const renderHeader = () => {
    if (!title && !closable) {
      return null;
    }
    return (
      <DialogTitle
        disableTypography
        className={clsx(classes.dialogTitle, stepClasses.stepHeader, stepClasses.stepHeaderExtra, {
          [headerClassName]: headerClassName,
        })}
      >
        <div data-cy="dialogStepTitle" className={stepClasses.stepTitle}>
          {applyBack && <IconButton className={classes.backBtn} icon={<ArrowBackIcon />} onClick={onBack} />}
          {title}
        </div>
        {closable ? closeIcon || <CloseIcon className={classes.dialogCloseIcon} onClick={onClose} /> : null}
      </DialogTitle>
    );
  };

  const renderFooter = () => {
    if (!footerActions && !applyDefaultAction) {
      return null;
    }
    return (
      <DialogActions
        className={clsx(stepClasses.stepFooterActions, stepClasses.stepFooterExtra)}
        classes={{ spacing: classes.spacing }}
      >
        {!!footerActions && footerActions}
        {applySecondaryAction && (
          <Button
            borderColor={LIGHTEN_GRAY_COLOR}
            textColor={DARK_BLUE_COLOR}
            bgColor={LIGHTEN_GRAY_COLOR}
            fontWeight="medium"
            onClick={onClose}
            {...secondaryActionProps}
          >
            {secondaryActionText}
          </Button>
        )}
        {applyDefaultAction && !downloadAction && (
          <Button
            data-cy="saveButton"
            onClick={onDefaultAction}
            fontWeight="medium"
            startIcon={defaultActionIcon}
            {...defaultActionProps}
          >
            {defaultActionText}
          </Button>
        )}

        {downloadAction && (
          <Link to="/FlashForm.pdf" target="_blank" download>
            <span className={classes.downloadButton}>Download</span>
          </Link>
        )}
      </DialogActions>
    );
  };

  return (
    <Dialog
      classes={{
        paper: `${classes.dialogPaper} ${paperClassName}`,
        ...((!restProps.fullScreen && dialogClassesRegardingMaxWidthProp[maxWidth]) || {}),
      }}
      BackdropProps={{
        classes: { root: classes.backdrop },
      }}
      maxWidth={maxWidth}
      open={open}
      onClose={onClose}
      fullWidth
      {...(applyMobileLayout ? { fullScreen: true } : {})}
      {...restProps}
    >
      {renderHeader()}
      <DialogContent className={clsx(stepClasses.stepBody, stepClasses.stepBodyExtra, bodyClass)}>
        {children}
      </DialogContent>
      {renderFooter()}
    </Dialog>
  );
};

export default MainDialog;
