import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ReactComponent as ArrowBackIcon } from 'assets/icons/back.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/content-save.svg';
import { useStepStyles } from 'styles/Step';
import Button from 'components/shared/Button/Button';
import IconButton from 'components/shared/Button/IconButton';
import Card from 'components/shared/Card';
import {
  DESKTOP_LAYOUT_CONTAINER_PADDING,
  MOBILE_LAYOUT_CONTAINER_PADDING,
  MOBILE_LAYOUT_WIDTH_BREAKPOINT,
  DARK_BLUE_COLOR,
  GRAY_COLOR,
  WHITE_COLOR
} from 'constants/index';
import DisabledFieldTooltip from '../disabledFieldTooltip/DisabledFieldTooltip';

const useStyles = makeStyles({
  addOrEditFormBodyInner: {
    overflowY: 'auto',
    flex: 1,
    padding: ({ applyMobileLayout }) =>
      applyMobileLayout
        ? `${DESKTOP_LAYOUT_CONTAINER_PADDING}px ${MOBILE_LAYOUT_CONTAINER_PADDING}px`
        : DESKTOP_LAYOUT_CONTAINER_PADDING,
    scrollBehavior: 'smooth'
  },
  addOrEditBackBtn: {
    marginRight: 8
  },
  addOrEditSaveButton: {
    marginLeft: 16
  }
});

const AddOrEdit = React.forwardRef(
  (
    {
      actions,
      headerActions,
      applyDefaultActions = true,
      saveText = 'Save',
      title = '',
      className,
      onSubmit = () => {},
      onCancel = () => {},
      onBack = () => {},
      hideBackButton,
      children,
      footerBgColor,
      ignoreCancelAction = false,
      addOrEditFormBodyInnerClass = '',
      cardBodyRef,
      saveButtonProps = {},
      cancelButtonProps = {},
      disabledButtonTooltipProps = {}
    },
    ref
  ) => {
    const applyMobileLayout = useMediaQuery(`(max-width:${MOBILE_LAYOUT_WIDTH_BREAKPOINT}px)`);
    const classes = useStyles({ applyMobileLayout });
    const stepClasses = useStepStyles({ applyMobileLayout, footerBgColor });

    return (
      <Card ref={ref} className={className}>
        <div className={stepClasses.stepRoot}>
          {!applyMobileLayout && (
            <div className={stepClasses.stepHeader}>
              {!hideBackButton && (
                <IconButton
                  className={classes.addOrEditBackBtn}
                  icon={<ArrowBackIcon />}
                  onClick={onBack}
                />
              )}
              <div data-cy="addEditStepTitle" className={stepClasses.stepTitle}>
                {title}
              </div>
              {headerActions || null}
            </div>
          )}
          <form className={stepClasses.stepBody} onSubmit={onSubmit}>
            <div
              className={`${classes.addOrEditFormBodyInner} ${addOrEditFormBodyInnerClass}`}
              ref={cardBodyRef}
            >
              {children}
            </div>
            {(applyDefaultActions || !!actions) && (
              <div className={stepClasses.stepFooterActions}>
                {!!actions && actions}
                {applyDefaultActions && (
                  <>
                    {!ignoreCancelAction && (
                      <DisabledFieldTooltip {...disabledButtonTooltipProps}>
                        <span>
                          <Button
                            onClick={onCancel}
                            bgColor={WHITE_COLOR}
                            borderColor={GRAY_COLOR}
                            textColor={DARK_BLUE_COLOR}
                            {...cancelButtonProps}
                          >
                            Cancel
                          </Button>
                        </span>
                      </DisabledFieldTooltip>
                    )}
                    <DisabledFieldTooltip {...disabledButtonTooltipProps}>
                      <span>
                        <Button
                          data-cy="addOrEditSaveButton"
                          type="submit"
                          className={classes.addOrEditSaveButton}
                          startIcon={<SaveIcon />}
                          {...saveButtonProps}
                        >
                          {saveText}
                        </Button>
                      </span>
                    </DisabledFieldTooltip>
                  </>
                )}
              </div>
            )}
          </form>
        </div>
      </Card>
    );
  }
);

export default AddOrEdit;
