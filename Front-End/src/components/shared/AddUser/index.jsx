import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { DARK_BLUE_COLOR, USER_TYPES } from 'constants/index';
import TextField from 'components/shared/Fields/TextField';
import PasswordField from 'components/shared/Fields/PasswordFields';
import Select from 'components/shared/Fields/Select';
import Button from 'components/shared/Button/Button';
import SubTitle from 'components/shared/SubTitle';

const useStyles = makeStyles(() => ({
  containerRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: 352,
    margin: '0 auto'
  },
  container: {
    alignItems: 'end'
  },
  checkAccountText: {
    fontSize: 14,
    color: DARK_BLUE_COLOR,
    marginRight: 16,
    display: 'flex',
    alignItems: 'center'
  },
  topPartRoot: {
    minHeight: 40,
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 20,
    width: '95%'
  },
  link: {
    textDecoration: 'none'
  },
  formContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: 352,
    margin: '0 auto'
  },
  forgotPassword: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  forgotPasswordLink: {
    color: `${DARK_BLUE_COLOR}80`,
    fontSize: 14
  },
  field: {
    marginTop: 20
  },
  submit: {
    marginTop: 32
  },
  hiddenTextField: {
    display: 'none'
  },
  center: {
    textAlign: 'center',
    width: '100%'
  },
  addUser: {}
}));

const AddUser = (addUserHandler = () => {}) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    userType: ''
  });

  const { email, password, firstName, lastName, userType } = formData;

  const inputChangeHandler = e => {
    e.persist();
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const userHandler = () => {
    addUserHandler(formData);
  };

  return (
    <Grid container spacing={3} className={classes.container}>
      <SubTitle className={classes.flexFullWidth}>General Info</SubTitle>
      <Grid item xs={3}>
        <TextField
          required
          formControlClassName={classes.field}
          placeholder="First Name"
          value={firstName}
          onChange={inputChangeHandler}
          fullWidth
          label="First Name"
          id="firstName"
          autoComplete="firstName"
          autoFocus
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          required
          formControlClassName={classes.field}
          placeholder="Last Name"
          value={lastName}
          onChange={inputChangeHandler}
          fullWidth
          label="Last Name"
          id="lastName"
          autoComplete="lastName"
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          required
          formControlClassName={classes.field}
          placeholder="Enter your email"
          value={email}
          onChange={inputChangeHandler}
          fullWidth
          label="Email"
          id="email"
          autoComplete="email"
        />
      </Grid>
      <SubTitle className={classes.flexFullWidth}>Set a Password</SubTitle>
      <Grid item xs={3}>
        <PasswordField
          required
          placeholder="Enter your password"
          formControlClassName={classes.field}
          value={password}
          onChange={inputChangeHandler}
          fullWidth
          id="password"
          label="Password"
          autoComplete="current-password"
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          required
          placeholder="User Type"
          options={USER_TYPES}
          formControlClassName={classes.field}
          onChange={e => setFormData(prev => ({ ...prev, userType: e.target.value }))}
          name="userType"
          applyEmptyOption
          emptyOptionTitle="Select User Type"
          value={userType}
          fullWidth
          id="userType"
          label="User Type"
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          color="primary"
          className={classes.addUser}
          onClick={userHandler}
        >
          Add another user
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddUser;
