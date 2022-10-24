import { makeStyles } from '@material-ui/core/styles';
import {
  DARK_BLUE_COLOR,
  GRAY_COLOR,
  LIGHTEN_GRAY_COLOR,
  LIGHTEST_GRAY_COLOR
} from 'constants/index';

export const useMenuStyles = makeStyles({
  menuPaper: {
    border: `1px solid ${GRAY_COLOR}`,
    margin: '0 !important',
    boxSizing: 'border-box',
    boxShadow: '0px 4px 4px rgba(8, 35, 48, 0.12)',
    borderRadius: '0 0 5px 5px',
    backgroundColor: '#fff',
    '& > .MuiMenu-list': {
      paddingTop: '0 !important',
      paddingBottom: '0 !important'
    }
  },
  menuPaperWithDarkBorder: {
    borderColor: GRAY_COLOR
  },
  menuItem: {
    position: 'relative',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '20px',
    color: DARK_BLUE_COLOR,
    backgroundColor: 'transparent',
    padding: '10px 16px',
    '&.Mui-focusVisible': {
      backgroundColor: LIGHTEN_GRAY_COLOR
    },
    '&:hover': {
      backgroundColor: LIGHTEN_GRAY_COLOR
    },
    '&.Mui-selected': {
      backgroundColor: LIGHTEN_GRAY_COLOR
    },
    '& .MuiTouchRipple-root': {
      display: 'none'
    }
  },
  menuItemWithDivider: {
    '&:not(:last-child)': {
      '&&:after': {
        position: 'absolute',
        left: 13,
        content: '""',
        right: 13,
        bottom: 0,
        borderBottom: `1px solid ${LIGHTEST_GRAY_COLOR}`
      }
    }
  },
  autocompleteMenuItem: {
    fontSize: 12,
    lineHeight: '15px',
    color: DARK_BLUE_COLOR,
    backgroundColor: 'transparent',
    padding: '0px 16px !important',
    marginBottom: 8,
    '&[data-focus="true"]': {
      backgroundColor: LIGHTEN_GRAY_COLOR
    },
    '&:hover': {
      backgroundColor: LIGHTEN_GRAY_COLOR
    },
    '&.Mui-selected': {
      backgroundColor: LIGHTEN_GRAY_COLOR
    },
    '& .MuiTouchRipple-root': {
      display: 'none'
    }
  }
});
