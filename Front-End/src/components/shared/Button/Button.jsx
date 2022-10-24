/* eslint-disable no-nested-ternary */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialButton from "@material-ui/core/Button";
import { LIGHT_BLUE_COLOR, WHITE_COLOR, BUTTON_SIZES } from "constants/index";
import {
  getDisabledButtonBgColor,
  getDisabledButtonBorderColor,
  getDisabledButtonTextColor,
} from "helpers/styles";
import GrayTooltipWithArrow from "../tooltip/GrayTooltipWithArrow";

const useStyles = makeStyles({
  buttonRoot: ({
    borderRadius,
    bgColor,
    borderWidth,
    borderColor,
    hoveredBgColor,
    size,
    padding,
    flex1,
  }) => ({
    ...(flex1 ? { flex: 1 } : {}),
    borderRadius,
    backgroundColor: bgColor,
    borderWidth,
    borderStyle: "solid",
    borderColor,
    "&:hover": {
      backgroundColor: hoveredBgColor || bgColor,
      boxShadow: "none",
    },
    padding:
      padding ||
      (size === BUTTON_SIZES.small
        ? "3px 14px"
        : size === BUTTON_SIZES.large
        ? "15px 32px"
        : "7px 16px"),
    boxSizing: "border-box",
    boxShadow: "none",
    lineHeight: "24px",
  }),
  disable: {
    "&.Mui-disabled": {
      backgroundColor: ({ bgColor }) => getDisabledButtonBgColor(bgColor),
      borderColor: ({ borderColor }) =>
        getDisabledButtonBorderColor(borderColor),
    },
    "& svg path": {
      fill: ({ textColor, bgColor }) =>
        getDisabledButtonTextColor(textColor, bgColor),
    },
    "& $buttonLabel": {
      color: ({ textColor, bgColor }) =>
        getDisabledButtonTextColor(textColor, bgColor),
    },
  },
  buttonLabel: {
    textTransform: "none",
    color: ({ textColor }) => textColor,
    fontSize: ({ fontSize }) => fontSize,
    fontWeight: ({ fontWeight }) => fontWeight,
  },
  startIcon: {
    marginRight: 2,
  },
});

const Button = React.forwardRef((props, ref) => {
  const {
    flex1 = false,
    bgColor = LIGHT_BLUE_COLOR,
    borderColor = LIGHT_BLUE_COLOR,
    borderWidth = 1,
    textColor = WHITE_COLOR,
    fontSize = 14,
    fontWeight = "normal",
    borderRadius = 5,
    size = BUTTON_SIZES.medium,
    children,
    disableRipple = false,
    applyTooltip = false,
    tooltipProps = {},
    variant = "contained",
    className = "",
    classes = {},
    hoveredBgColor,
    padding,
    actionName = "",
    ...restProps
  } = props;
  const styles = useStyles({
    bgColor,
    hoveredBgColor,
    borderColor,
    borderWidth,
    textColor,
    fontSize,
    fontWeight,
    borderRadius,
    size,
    padding,
    flex1,
  });
  const button = (
    <MaterialButton
      classes={{
        disabled: styles.disable,
        label: styles.buttonLabel,
        startIcon: styles.startIcon,
        ...classes,
      }}
      disableRipple={disableRipple}
      ref={ref}
      className={`${styles.buttonRoot} ${className}`}
      variant={variant}
      {...restProps}
    >
      {children}
    </MaterialButton>
  );

  if (actionName) {
    return null;
  }
  if (applyTooltip) {
    return (
      <GrayTooltipWithArrow
        placement="bottom"
        enterDelay={1000}
        {...tooltipProps}
      >
        {button}
      </GrayTooltipWithArrow>
    );
  }

  return button;
});

Button.displayName = "Button";

export default Button;
