import { makeStyles } from '@material-ui/core/styles';

import { ERROR_COLOR, TEXTFIELD_COLOR, ORANGE_COLOR } from 'constants/index';

export const useFieldStyles = makeStyles({
  fieldXs: {
    '& .MuiFormLabel-root': {
      fontSize: 14
    },
    '& .MuiOutlinedInput-root': {
      minHeight: 32
    },
    '& .MuiOutlinedInput-inputMarginDense': {
      paddingTop: 5,
      paddingBottom: 5
    },
    '& .MuiOutlinedInput-input': {
      fontSize: '14px !important',
      lineHeight: '20px !important'
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 8px) scale(1)'
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)'
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline legend': {
      fontSize: 11
    },
    '& .MuiInputAdornment-root .MuiTypography-root': {
      fontSize: 14,
      color: TEXTFIELD_COLOR
    }
  },
  fieldLabel: ({ disabled }) => ({
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '22px',
    color: TEXTFIELD_COLOR,
    opacity: disabled ? 0.4 : 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  }),
  fieldLabelError: {
    color: ERROR_COLOR
  },
  fieldLabelWarning: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: ORANGE_COLOR
      },
      '&:hover fieldset': {
        borderColor: ORANGE_COLOR
      },
      '&.Mui-focused fieldset': {
        borderColor: ORANGE_COLOR
      }
    }
  }
});
