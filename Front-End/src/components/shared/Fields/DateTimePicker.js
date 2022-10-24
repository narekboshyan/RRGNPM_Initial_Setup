import React, { forwardRef, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Calendar } from '@material-ui/pickers';
import Select from 'components/shared/Fields/Select';
import IconButton from 'components/shared/Button/IconButton';
import { useFormatDate } from 'hooks/formatDate';
import { ReactComponent as CalendarBlueIcon } from 'assets/icons/calendar_blue_icon_32.svg';
import { ReactComponent as LeftArrowIcon } from 'assets/icons/left_arrow_blue_icon_24.svg';
import { ReactComponent as RightArrowIcon } from 'assets/icons/right_arrow_blue_icon_24.svg';
import { MENU_DEFAULT_PROPS, SELECT_OPTIONS, DATE_TIME_FORMAT, DATE_FORMAT } from 'constants/index';
import { v4 } from 'uuid';
import { useStyles } from './dateTimePickerStyles';

const getHours = date => date.getHours();
const getMinutes = date => date.getMinutes();
const setHoursAndMinutes = (date = new Date(), hours, minutes) => {
  const h = hours || getHours(date);
  const m = minutes || getMinutes(date);

  return new Date(date.setHours(h, m, 0, 0));
};

const parseDate = date => {
  if (date instanceof Date) return date;
  if (Date.parse(date)) return new Date(date);

  return null;
};

const CalendarIcon = ({ onClick }) => {
  const classes = useStyles();
  return (
    <IconButton
      onClick={onClick}
      classes={{
        root: classes.iconButtonRoot
      }}
      disableRipple
      disableFocusRipple
      icon={<CalendarBlueIcon />}
    />
  );
};

const DateTimePicker = forwardRef(
  (
    {
      placeholder,
      value,
      timePicker = false,
      onChange = () => {},
      minDate,
      maxDate,
      disabled,
      disablePast,
      disableFuture,
      error,
      helperText,
      onClose,
      startAdornment,
      endAdornment,
      ...restProps
    },
    ref
  ) => {
    const { formatDate } = useFormatDate();
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const parsedDate = useMemo(() => parseDate(value), [value]);
    const [date, setDate] = useState(parsedDate);

    useEffect(() => {
      if (parsedDate) {
        setDate(parsedDate);
      }
    }, [parsedDate]);

    const handleChange = useCallback(
      obj => {
        const dateObj = {
          date,
          ...obj
        };
        onChange(setHoursAndMinutes(dateObj.date, dateObj.hours, dateObj.minutes));
      },
      [onChange, date]
    );

    const handleDateChange = (changedDate, isFin) => {
      if (!isFin) return;
      setDate(changedDate);
      setIsOpen(false);
      handleChange({ date: changedDate });
    };

    const getStartAdornment = useCallback(() => {
      if (startAdornment === undefined) {
        return <CalendarIcon onClick={() => setIsOpen(true)} />;
      }
      return startAdornment;
    }, [startAdornment]);

    const customRenderValue = () => {
      if (!parsedDate) return '';
      const formattedDate = formatDate(parsedDate, {
        format: timePicker ? DATE_TIME_FORMAT : DATE_FORMAT
      });
      return <span className={classes.displayedDateTime}>{formattedDate}</span>;
    };

    return (
      <Select
        ref={ref}
        placeholder={parsedDate ? '' : placeholder}
        formControlClassName={classes.formControl}
        selectClasses={{
          select: classes.select
        }}
        MenuProps={{
          ...MENU_DEFAULT_PROPS,
          open: isOpen,
          onClose: () => setIsOpen(false),
          classes: { paper: classes.menu }
        }}
        selectProps={{
          onClose,
          error,
          helperText: disabled ? '' : helperText,
          SelectDisplayProps: {
            onClick: () => setIsOpen(true),
            style: { paddingLeft: 8, paddingRight: 8 }
          },
          startAdornment: getStartAdornment(),
          endAdornment,
          displayEmpty: true
        }}
        disabled={disabled}
        customRenderValue={customRenderValue}
        renderer={() => (
          <div className={classes.dateTimePicker} key={v4()}>
            <Calendar
              allowKeyboardControl={false}
              classes={{ week: classes.week }}
              date={date}
              onChange={handleDateChange}
              leftArrowIcon={<LeftArrowIcon />}
              rightArrowIcon={<RightArrowIcon />}
              rightArrowButtonProps={{
                disabled: true
              }}
              {...(minDate ? { minDate } : {})}
              {...(maxDate ? { maxDate } : {})}
              disablePast={disablePast}
              disableFuture={disableFuture}
            />
          </div>
        )}
        options={SELECT_OPTIONS}
        {...restProps}
      />
    );
  }
);

export default memo(DateTimePicker);
