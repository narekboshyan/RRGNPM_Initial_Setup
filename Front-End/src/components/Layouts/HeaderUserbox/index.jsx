import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Badge,
  Menu,
  Button,
  List,
  ListItem,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainDialog from 'components/shared/dialog/MainDialog';
import { Autocomplete } from '@material-ui/lab';

import { SEARCH_COMPANY, SWITCH_COMPANY } from 'graphql/queries/company';
import { useQueryWithOnError } from 'hooks/apollo';
import { addLoadingData, addSnackbar, removeLoadingData } from 'redux/slices/shared';
import { allowedPages } from 'redux/slices/permission';
import {
  GENERAL_ADMIN_ROLE,
  SIGN_IN_ROUTE,
  FETCH_LOADING_TEXT,
  SELECTED_COMPANY,
  SNACKBAR_TYPE
} from 'constants/index';
import { getItemFromLocalStorage, setItemToLocalStorage } from 'utils';

const StyledBadge = withStyles({
  badge: {
    backgroundColor: 'var(--success)',
    color: 'var(--success)',
    boxShadow: '0 0 0 2px #fff',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
})(Badge);

const useStyles = makeStyles({
  companyField: {
    width: 350
  },
  selectFieldClassName: {
    height: 200,
    flex: 'none !important',
    '& .MuiAutocomplete-popperDisablePortal': {
      bottom: 200
    }
  },
  selectField: {
    width: 300,
    '& .MuiOutlinedInput-adornedEnd': {
      padding: 2
    },
    position: 'relative'
  },
  autoComplete: {}
});

const reducerTypes = {
  INPUT_VALUE: 'INPUT_VALUE',
  VALUE: 'VALUE',
  RESET: 'RESET'
};

const switchCompanyReducer = (state, { type, payload }) => {
  switch (type) {
    case reducerTypes.VALUE:
      return {
        ...state,
        value: payload
      };
    case reducerTypes.INPUT_VALUE:
      return {
        inputValue: payload,
        value: payload
      };

    case reducerTypes.RESET:
      return {
        inputValue: getItemFromLocalStorage(SELECTED_COMPANY),
        value: getItemFromLocalStorage(SELECTED_COMPANY)
      };
    default:
      return state;
  }
};

export default function HeaderUserbox() {
  const { user } = useSelector(state => state.user);
  const [switchCompanyIsOpen, setSwitchCompanyIsOpen] = useState(false);
  const [searchCompany, setSearchCompany] = useState('');
  const [switchCompanyState, dispatchSwitchCompanyState] = useReducer(switchCompanyReducer, {
    value: '',
    inputValue: ''
  });
  const [companySearchValue, setCompanySearchValue] = useState('');
  const { value, inputValue } = switchCompanyState;
  const classes = useStyles();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.clear();
    navigate(SIGN_IN_ROUTE);
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      setSearchCompany(value);
    }, 500);
    return () => {
      clearTimeout(interval);
    };
  }, [setSearchCompany, value]);

  const submitHandler = () => {
    if ((!companySearchValue && !inputValue) || !value) {
      dispatch(
        addSnackbar({
          type: SNACKBAR_TYPE.error,
          message: "Company name can't be empty"
        })
      );
      return;
    }

    setItemToLocalStorage(SELECTED_COMPANY, value);
    setAnchorEl(null);
    setCompanySearchValue(getItemFromLocalStorage(SELECTED_COMPANY) || value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={handleClick}
        className="text-capitalize px-3 text-left btn-inverse d-flex align-items-center"
      >
        <Box>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            variant="dot"
          >
            <div className="dropdown-background">
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </div>
          </StyledBadge>
        </Box>
        <span className="pl-1 pl-xl-3">
          <FontAwesomeIcon icon={['fas', 'angle-down']} className="opacity-5" />
        </span>
      </Button>

      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        onClose={handleClose}
        className={classes.position}
      >
        <div className="dropdown-menu-right dropdown-menu-lg overflow-hidden p-0">
          <List className="text-left bg-transparent d-flex align-items-center flex-column pt-0">
            <Box>
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                variant="dot"
              >
                <div className="dropdown-background">
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </div>
              </StyledBadge>
            </Box>
            <div className="pl-3 ">
              <div className="font-weight-bold text-center pt-2 line-height-1">
                {user.firstName} {user.lastName}
              </div>
              <p className="text-black-50 text-center">
                {getItemFromLocalStorage(SELECTED_COMPANY)}
              </p>
            </div>
            <Divider className="w-100 mt-2" />

            {user.role !== GENERAL_ADMIN_ROLE.id && (
              <ListItem button onClick={() => setSwitchCompanyIsOpen(true)}>
                Switch Company
              </ListItem>
            )}
            <ListItem button onClick={logout}>
              Log Out
            </ListItem>
          </List>
        </div>
      </Menu>
      {user.role !== GENERAL_ADMIN_ROLE.id && (
        <MainDialog
          open={switchCompanyIsOpen}
          bodyClass={classes.selectFieldClassName}
          onClose={() => {
            setSwitchCompanyIsOpen(false);
            setAnchorEl(null);
            dispatchSwitchCompanyState({ type: reducerTypes.RESET });
          }}
          title="Please select a company"
          defaultActionProps={{ startIcon: '' }}
          defaultActionText="Change"
          applySecondaryAction
          onDefaultAction={submitHandler}
        >
          <Autocomplete
            value={value}
            autoHighlight
            className={classes.autoComplete}
            onChange={(_, value) =>
              dispatchSwitchCompanyState({ type: reducerTypes.VALUE, payload: value })
            }
            onInputChange={(event, inputValue) =>
              dispatchSwitchCompanyState({ type: reducerTypes.INPUT_VALUE, payload: inputValue })
            }
            inputValue={inputValue}
            id="switch-company"
            options={[]}
            sx={{ width: 400 }}
            renderInput={params => (
              <TextField className={classes.companyField} {...params} label="Switch Company" />
            )}
          />
        </MainDialog>
      )}
    </>
  );
}
