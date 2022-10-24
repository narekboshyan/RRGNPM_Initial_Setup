import { makeStyles } from '@material-ui/core';
import {
  GRAY_COLOR,
  LIGHT_BLUE_COLOR,
  LIGHTEN_GRAY_COLOR,
  DARK_BLUE_COLOR,
  WHITE_COLOR,
  DARKEN_GRAY_COLOR,
  GRAY_BLUE_COLOR
} from 'constants/index';

export const useStyles = makeStyles({
  dateTimePicker: {
    '& .MuiPickersCalendarHeader-switchHeader': {
      alignItems: 'center',
      marginTop: 12,
      marginBottom: 14,
      paddingLeft: 20,
      paddingRight: 6,

      '& .MuiIconButton-root': {
        padding: 4
      }
    },
    '& .MuiPickersCalendar-transitionContainer': {
      minHeight: 218,
      marginTop: 6
    },
    '& .MuiPickersCalendarHeader-transitionContainer': {
      order: -1,

      '& .MuiTypography-alignCenter': {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.8,
        letterSpacing: 0.1,
        color: DARK_BLUE_COLOR,
        textAlign: 'left'
      }
    },
    '& .MuiPickersCalendarHeader-daysHeader': {
      padding: '0 8px',

      '& .MuiTypography-root': {
        color: DARKEN_GRAY_COLOR
      }
    },
    '& button.Mui-disabled': {
      opacity: 0.4
    }
  },
  week: {
    '& .MuiPickersDay-dayDisabled': {
      '& .MuiTypography-body2': {
        color: GRAY_BLUE_COLOR
      }
    },
    '& .MuiTypography-body2': {
      color: DARK_BLUE_COLOR,
      fontWeight: 500,
      letterSpacing: 0.75
    },
    '& .MuiPickersDay-daySelected': {
      backgroundColor: `${LIGHT_BLUE_COLOR} !important`,

      '& .MuiTypography-body2': {
        color: WHITE_COLOR
      }
    },
    '& .MuiPickersDay-current': {
      backgroundColor: LIGHTEN_GRAY_COLOR,

      '& .MuiTypography-body2': {
        color: LIGHT_BLUE_COLOR
      }
    }
  },
  timePickerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 8px 8px 16px',
    borderTop: `1px solid ${GRAY_COLOR}`
  },
  timePickerFields: {
    display: 'flex',
    alignItems: 'center'
  },
  compobox: {
    width: 80
  },
  hourPicker: {
    marginRight: 8
  },
  inputRoot: {
    paddingRight: 8
  },
  select: {
    '&:focus': {
      backgroundColor: WHITE_COLOR
    }
  },
  iconButtonRoot: {
    padding: '4px 0 4px 8px',

    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  displayedDateTime: {
    fontSize: 14,
    lineHeight: 1.43,
    letterSpacing: 0.25
  },
  clearDate: {
    marginRight: ({ endAdornment }) => (endAdornment ? 0 : 8)
  },
  formControl: {
    '& .MuiOutlinedInput-adornedStart': {
      paddingLeft: 0
    },
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: 8
    }
  },
  menu: {
    minWidth: 'unset !important',
    borderRadius: '0px 0px 10px 10px',
    boxShadow: '0px 4px 4px rgba(8, 35, 48, 0.12)',
    transform: 'translate(-40px, 4px) !important'
  },
  endAdornmentContainer: {
    display: 'flex',
    alignItems: 'center'
  }
});
