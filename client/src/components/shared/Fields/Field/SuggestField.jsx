import React, { useState, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import { Popper, ClickAwayListener, makeStyles, MenuItem, MenuList } from "@material-ui/core";
import { useFieldStyles, useMenuStyles } from "styles";
import { useTypographyStyles } from "styles/Typography";
import { GRAY_COLOR, WHITE_COLOR, LIGHT_BLUE_COLOR } from "constants/index";
import { isRegexExpressionValid } from "helpers/common";
import TextField from "../TextField";

const useStyles = makeStyles({
  labelBox: {
    display: "flex",
    alignItems: "center",
  },
  menuList: {
    backgroundColor: WHITE_COLOR,
    border: `1px solid ${GRAY_COLOR}`,
    boxShadow: "0px 4px 4px rgba(8, 35, 48, 0.12)",
    borderRadius: "0px 0px 5px 5px",
    boxSizing: "border-box",
  },
  menuItem: {
    display: "block",
  },
  popperRoot: {
    width: "100%",
    zIndex: 1300,
    marginTop: 4,
  },
  highlightedPart: {
    color: LIGHT_BLUE_COLOR,
  },
});

const SuggestField = React.forwardRef((props, ref) => {
  const {
    value = "",
    onChange = () => {},
    onClose,
    disabled = false,
    error,
    label = "",
    labelAction = "",
    helperText = "",
    className = "",
    fieldLabelProps: { className: fieldLabelClassName = "", ...fieldLabelRestProps } = {},
    popperProps: { className: popperClassName, ...restPopperProps } = {},
    options = [],
    renderer,
    open: openProp = false,
    withMenuItemDivider = true,
    menuListClassName = "",
    menuItemLabelField = "",
    menuItemValueField = "",
    name = "",
    highlight = true,
    ...restProps
  } = props;

  const classes = useStyles();
  const typographyClasses = useTypographyStyles();
  const fieldStyles = useFieldStyles({ disabled });
  const menuClasses = useMenuStyles();

  const inputRef = useRef(null);
  const [open, setOpen] = useState(openProp);

  const getHighlightedText = useCallback(
    // eslint-disable-next-line no-shadow
    (text = "", highlight = "") => {
      if (!highlight || !isRegexExpressionValid(highlight)) return text;

      let isFound = false;

      const parts = text.split(RegExp(`(${highlight})`, "gi"));

      const check = (p = "", h = "") => {
        if (p.toLowerCase() === h.toLowerCase() && !isFound) {
          isFound = true;
          return isFound;
        }

        return false;
      };

      return (
        <>
          {parts.map((part) =>
            check(part, highlight) ? (
              <span key={uuidv4()} className={classes.highlightedPart}>
                {part}
              </span>
            ) : (
              <div key={uuidv4()}>{part}</div>
            )
          )}
        </>
      );
    },
    [classes]
  );

  const handleChange = useCallback(
    (details = {}, e) => {
      const { option, menuItemValueField: valueField } = details;

      const nativeEvent = e.nativeEvent || e;
      const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);

      Object.defineProperty(clonedEvent, "target", {
        writable: true,
        value: { value: valueField ? option[valueField] : option, name },
      });

      setOpen(false);
      onChange(clonedEvent);
    },
    [name, onChange]
  );

  return (
    <div ref={ref}>
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
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={(e) => {
          setOpen(false);
          if (onClose) onClose(e);
        }}
      >
        <div>
          <TextField
            value={value}
            onChange={(e) => {
              if (e.target.value?.trim()) setOpen(true);
              onChange(e);
            }}
            onClick={() => {
              setOpen(true);
              if (restProps.inputProps?.onClick instanceof Function) {
                restProps.inputProps.onClick();
              }
            }}
            ref={inputRef}
            disabled={disabled}
            className={className}
            helperText={helperText}
            error={!!error}
            {...restProps}
            inputProps={{
              required: false,
              ...(restProps.inputProps || {}),
            }}
          />
          <Popper
            id={`suggest popper-${name || ""}`}
            className={clsx(classes.popperRoot, popperClassName)}
            anchorEl={inputRef?.current}
            open={!disabled && !!(inputRef?.current && options?.length && open && openProp)}
            placement="bottom-start"
            modifiers={{
              flip: {
                enabled: false,
              },
            }}
            style={{ maxWidth: inputRef?.current?.clientWidth || "unset" }}
            {...restPopperProps}
          >
            <MenuList
              id={`suggest menu-${name || ""}`}
              className={clsx(menuClasses.menuPaper, {
                [menuListClassName]: !!menuListClassName,
              })}
              disablePadding
            >
              {options.map((option) => {
                if (renderer) {
                  return renderer(option);
                }
                if (typeof option === "object") {
                  return option.renderer
                    ? option.renderer()
                    : !option.hidden && (
                        <MenuItem
                          className={clsx(
                            menuClasses.menuItem,
                            classes.menuItem,
                            typographyClasses.ellipsis,
                            { [menuClasses.menuItemWithDivider]: withMenuItemDivider }
                          )}
                          key={`key-${option[menuItemValueField] || option.id}`}
                          value={option[menuItemValueField]}
                          onClick={(e) => handleChange({ option, menuItemValueField }, e)}
                        >
                          {highlight
                            ? getHighlightedText(option[menuItemLabelField], value)
                            : option[menuItemLabelField]}
                        </MenuItem>
                      );
                }
                return (
                  <MenuItem
                    className={clsx(
                      menuClasses.menuItem,
                      classes.menuItem,
                      typographyClasses.ellipsis,
                      { [menuClasses.menuItemWithDivider]: withMenuItemDivider }
                    )}
                    key={`key-${option}`}
                    value={option}
                    onClick={(e) => handleChange({ option }, e)}
                  >
                    {highlight ? getHighlightedText(option, value) : option}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Popper>
        </div>
      </ClickAwayListener>
    </div>
  );
});

export default SuggestField;
