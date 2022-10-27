import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, Select, TextField, OutlinedInput, InputAdornment, FormHelperText } from "@material-ui/core";
import { ReactComponent as ChevronUpIcon } from "assets/icons/chevron_up.svg";
import { ReactComponent as ChevronDownIcon } from "assets/icons/chevron_down.svg";
import { ReactComponent as ChevronUpSmallIcon } from "assets/icons/chevron_up_small.svg";
import { ReactComponent as ChevronDownSmallIcon } from "assets/icons/chevron_down_small.svg";
import { ReactComponent as DateRangeIcon } from "assets/icons/date_icon.svg";
import { ReactComponent as SearchIcon } from "assets/icons/search_icon.svg";
import { ReactComponent as CloseIcon } from "assets/icons/close_icon.svg";
import { ReactComponent as WarningIcon } from "assets/icons/warning_icon_16.svg";
import { useFieldStyles } from "styles/Field";
import { useMenuStyles } from "styles/Menu";
import { LIGHT_GRAY_COLOR, ORANGE_COLOR, DARK_BLUE_COLOR, PICKER_TYPE, FIELD_TYPE, FIELD_SIZE } from "constants/index";

const useStyles = makeStyles({
  formControl: {
    "& .MuiFormLabel-root": {
      color: `${LIGHT_GRAY_COLOR} !important`,
    },
  },
  icon: {
    cursor: "pointer",
    pointerEvents: "none",
  },
  chevron: {
    position: "absolute",
    right: 10,
  },
  chevronSmall: {
    position: "absolute",
    right: 0,
  },
  dateRange: {
    position: "absolute",
    right: 10,
  },
  warning: {
    position: "absolute",
    right: 10,
  },
  close: {
    position: "absolute",
    right: 10,
    cursor: "pointer",
  },
  endAdornment: {
    opacity: 0.2,
    position: "absolute",
    right: 38,
    height: 26,
    width: 26,
    borderRadius: "50%",
    transition: "200ms",
    cursor: "pointer",
    "&:hover": {
      opacity: 1,
      backgroundColor: "#f5f5f5",
    },
  },
  labelBox: {
    display: "flex",
    alignItems: "center",
  },
  formHelperText: {
    margin: 0,
  },
  formHelperWarning: {
    color: ORANGE_COLOR,
  },
  warningInputRoot: {
    paddingRight: 22,
  },
  warningTooltip: {
    padding: 12,
    border: `1px solid ${ORANGE_COLOR}`,
  },
  warningTooltipPopper: {
    maxWidth: 300,
    margin: "8px -34px 0 0",
  },

  warningTooltipText: {
    color: DARK_BLUE_COLOR,
    fontSize: 12,
    lineHeight: "16px",
  },
});

export const ChevronUp = () => {
  const classes = useStyles();
  return <ChevronUpIcon width="30" height="30" className={clsx(classes.icon, classes.chevron)} />;
};

export const ChevronUpSmall = () => {
  const classes = useStyles();
  return <ChevronUpSmallIcon width="30" height="30" className={clsx(classes.icon, classes.chevronSmall)} />;
};

export const ChevronDown = () => {
  const classes = useStyles();
  return <ChevronDownIcon width="30" height="30" className={clsx(classes.icon, classes.chevron)} />;
};

export const ChevronDownSmall = () => {
  const classes = useStyles();
  return <ChevronDownSmallIcon width="30" height="30" className={clsx(classes.icon, classes.chevronSmall)} />;
};

export const DateRange = () => {
  const classes = useStyles();
  return <DateRangeIcon width="30" height="30" className={clsx(classes.icon, classes.dateRange)} />;
};

export const WarningSmall = (props) => {
  const { width = "16", height = "16", ...rest } = props;
  const classes = useStyles();
  return <WarningIcon width={width} height={height} className={classes.warning} {...rest} />;
};

export const Search = (props) => {
  const { width, height, ...rest } = props;
  const classes = useStyles();
  return <SearchIcon width={width || "30"} height={height || "30"} className={classes.icon} {...rest} />;
};

const Field = React.forwardRef((props, ref) => {
  const {
    pickerType = PICKER_TYPE?.select,
    fieldType = FIELD_TYPE?.select,
    label = "",
    labelAction = "",
    options = [],
    disabled = false,
    className = "",
    dontOpenDropDown = false,
    forceCloseDropDown,
    customRenderValue,
    MenuProps: { classes: menuPropsClasses, ...restMenuProps } = {},
    selectClasses = {},
    onChange = () => {},
    value = "",
    selectProps: { error: selectError, helperText: selectHelperText, onClose = () => {}, ...restSelectProps } = {},
    fieldLabelProps: { className: fieldLabelClassName = "", ...fieldLabelRestProps } = {},
    formControlClassName = "",
    formControlStyle = {},
    fieldSize = FIELD_SIZE.sm,
    clearField,
    pointer = false,
    helperText = "",
    error = false,
    warning = false,
    warningConfig: { showIcon = true } = {},
    ...restProps
  } = props;
  const classes = useStyles();
  const menuClasses = useMenuStyles();
  const fieldStyles = useFieldStyles({ pointer, disabled });
  const [initialRender, setInitialRender] = useState(true);
  const [open, setOpen] = useState(false);
  const { paper: paperClasses, ...restMenuClasses } = menuPropsClasses || {};

  const onSelectOpen = () => {
    setOpen(true);
  };

  const onSelectClose = () => {
    setOpen(false);
    onClose();
  };

  useEffect(() => {
    if (!initialRender) {
      onSelectClose();
    }
    setInitialRender(false);
    // eslint-disable-next-line
  }, [forceCloseDropDown]);

  const id = uuidv4();

  const getIconComponent = () => {
    if (pickerType === PICKER_TYPE.dateRange) {
      return DateRange;
    }
    if (open) {
      return fieldSize === FIELD_SIZE.xs ? ChevronDownSmall : ChevronDown;
    }
    return fieldSize === FIELD_SIZE.xs ? ChevronUpSmall : ChevronUp;
  };

  let cmp = (
    <FormControl
      ref={ref}
      disabled={disabled}
      size="small"
      variant="outlined"
      className={`${classes.formControl} ${
        fieldSize === FIELD_SIZE.xs ? fieldStyles.fieldXs : ""
      } ${className} ${formControlClassName}`}
      error={!!selectError}
      {...restProps}
    >
      <div className={classes.labelBox}>
        {label && (
          <span
            className={clsx(fieldStyles.fieldLabel, {
              [fieldStyles.fieldLabelError]: selectError,
              [fieldLabelClassName]: fieldLabelClassName,
            })}
            {...fieldLabelRestProps}
          >
            {label}
            {restProps.required ? "*" : ""}
          </span>
        )}
        {labelAction}
      </div>
      <Select
        value={value}
        onChange={onChange}
        open={!dontOpenDropDown && open}
        // @Todo find best way
        variant="outlined"
        {...(clearField && value
          ? {
              endAdornment: (
                <CloseIcon
                  className={classes.endAdornment}
                  onClick={() => {
                    clearField();
                  }}
                />
              ),
            }
          : {})}
        labelId={id}
        onOpen={onSelectOpen}
        onClose={onSelectClose}
        IconComponent={getIconComponent()}
        MenuProps={{
          classes: {
            paper: clsx(menuClasses.menuPaper, paperClasses),
            ...restMenuClasses,
          },
          autoFocus: true,
          ...restMenuProps,
        }}
        classes={selectClasses}
        {...(customRenderValue ? { renderValue: customRenderValue } : {})}
        inputProps={{
          required: false,
          ...restProps.inputProps,
          placeholder: restProps.inputProps?.placeholder,
        }}
        {...restSelectProps}
      >
        {options}
      </Select>
      {!!selectHelperText && <FormHelperText className={classes.formHelperText}>{selectHelperText}</FormHelperText>}
    </FormControl>
  );

  if (fieldType === FIELD_TYPE.text) {
    const { InputProps = {}, ...restTextFieldProps } = restProps;

    cmp = (
      <FormControl
        className={formControlClassName}
        style={formControlStyle}
        fullWidth={restProps.fullWidth}
        disabled={disabled}
        error={!!error}
      >
        <div className={classes.labelBox}>
          {label && (
            <span
              className={clsx(fieldStyles.fieldLabel, {
                [fieldStyles.fieldLabelError]: !!error,
                [fieldLabelClassName]: fieldLabelClassName,
              })}
              {...fieldLabelRestProps}
            >
              {label}
              {restProps.required ? "*" : ""}
            </span>
          )}
          {labelAction}
        </div>
        <TextField
          value={value}
          onChange={onChange}
          ref={ref}
          disabled={disabled}
          variant="outlined"
          size="small"
          className={clsx(classes.formControl, className, {
            [fieldStyles.fieldXs]: fieldSize === FIELD_SIZE.xs,
            [fieldStyles.fieldLabelWarning]: warning,
          })}
          helperText={helperText}
          error={!!error}
          {...(warning && showIcon
            ? {
                InputProps: {
                  classes: { root: classes.warningInputRoot },
                  ...(InputProps || {}),
                },
                ...(restTextFieldProps || {}),
              }
            : restProps)}
          inputProps={{
            required: false,
            ...(restProps.inputProps || {}),
          }}
          FormHelperTextProps={{
            classes: {
              root: clsx(classes.formHelperText, {
                [classes.formHelperWarning]: warning,
              }),
            },
          }}
        />
      </FormControl>
    );
  }

  if (fieldType === FIELD_TYPE.search) {
    cmp = (
      <FormControl
        className={formControlClassName}
        style={formControlStyle}
        fullWidth={restProps.fullWidth}
        disabled={disabled}
        error={!!error}
      >
        <div className={classes.labelBox}>
          {label && (
            <span
              className={clsx(fieldStyles.fieldLabel, {
                [fieldStyles.fieldLabelError]: !!error,
                [fieldLabelClassName]: fieldLabelClassName,
              })}
              {...fieldLabelRestProps}
            >
              {label}
              {restProps.required ? "*" : ""}
            </span>
          )}
          {labelAction}
        </div>
        <OutlinedInput
          value={value}
          onChange={onChange}
          ref={ref}
          disabled={disabled}
          size="small"
          type="text"
          error={!!error}
          endAdornment={
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          }
          className={`${classes.formControl} ${fieldSize === FIELD_SIZE.xs ? fieldStyles.fieldXs : ""} ${className}`}
          {...restProps}
          inputProps={{
            required: false,
            ...(restProps.inputProps || {}),
          }}
        />
        {!!helperText && <FormHelperText classes={{ root: classes.formHelperText }}>{helperText}</FormHelperText>}
      </FormControl>
    );
  }

  return cmp;
});

export default Field;
