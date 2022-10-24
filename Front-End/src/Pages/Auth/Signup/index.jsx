import TextField from "components/shared/Fields/TextField";
import React, { useEffect, useState } from "react";
import Button from "components/shared/Button/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import PasswordField from "components/shared/Fields/PasswordFields";
import { Link, useNavigate } from "react-router-dom";
import { useMutationWithOnError } from "hooks/apollo";
import { SIGN_UP } from "graphql/mutations/auth";
import {
  addLoadingData,
  addSnackbar,
  removeLoadingData,
} from "redux/slices/shared";
import { useDispatch } from "react-redux";
import {
  FETCH_LOADING_TEXT,
  DARK_BLUE_COLOR,
  LIGHT_BLUE_COLOR,
  WHITE_COLOR,
  SNACKBAR_TYPE,
  SIGN_IN_ROUTE,
} from "constants/index";

const useStyles = makeStyles(() => ({
  containerRoot: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: 352,
    margin: "0 auto",
  },
  checkAccountText: {
    fontSize: 14,
    color: DARK_BLUE_COLOR,
    marginRight: 16,
    display: "flex",
    alignItems: "center",
  },
  topPartRoot: {
    minHeight: 40,
    display: "flex",
    justifyContent: "flex-end",
    padding: 20,
    width: "95%",
  },
  link: {
    textDecoration: "none",
  },
  formContent: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: 352,
    margin: "0 auto",
  },
  forgotPassword: {
    display: "flex",
    justifyContent: "flex-end",
  },
  forgotPasswordLink: {
    color: `${DARK_BLUE_COLOR}80`,
    fontSize: 14,
  },
  field: {
    marginTop: 20,
  },
  submit: {
    marginTop: 32,
  },
  hiddenTextField: {
    display: "none",
  },
  center: {
    textAlign: "center",
    width: "100%",
  },
}));

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const { email, password, firstName, lastName } = formData;
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [signupUser, { data: signUpData, loading: signUpLoading }] =
    useMutationWithOnError(SIGN_UP);

  useEffect(() => {
    if (signUpLoading) {
      dispatch(
        addLoadingData({
          key: "signUpLoading",
          text: FETCH_LOADING_TEXT,
          open: true,
        })
      );
    } else {
      dispatch(removeLoadingData("signUpLoading"));
    }
  }, [signUpLoading, dispatch]);

  useEffect(() => {
    if (signUpData?.signup) {
      dispatch(
        addSnackbar({
          type: SNACKBAR_TYPE.success,
          message: "You have successfully signed up",
        })
      );
      navigate(SIGN_IN_ROUTE);
    }
  }, [signUpData, dispatch, navigate]);

  const inputChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await signupUser({
      variables: { data: formData },
    });
  };

  return (
    <>
      <Grid container sx={{ height: "100vh", overflow: "hidden" }}>
        <div className={classes.topPartRoot}>
          <div className={classes.checkAccountText}>
            Already have an account?
          </div>
          <Link to={SIGN_IN_ROUTE} className={classes.link}>
            <Button textColor={LIGHT_BLUE_COLOR} bgColor={WHITE_COLOR}>
              SIGN IN
            </Button>
          </Link>
        </div>
        <Grid
          container
          display="flex"
          sx={{ height: "100%", width: "100%" }}
          justifycontent="center"
          flexdirection="column"
          alignItems="center"
        >
          <form onSubmit={submitHandler} className={classes.containerRoot}>
            <Grid container spacing={2} display="flex" justifycontent="center">
              <Typography variant="h4" className={classes.center}>
                Sign up
              </Typography>
              <img src="assets/icons/logo-2.png" alt="" />
              <Grid item xs={12}>
                <TextField
                  required
                  placeholder="Enter your First Name"
                  formControlClassName={classes.field}
                  value={firstName}
                  onChange={inputChangeHandler}
                  fullWidth
                  label="First Name"
                  id="firstName"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  placeholder="Enter your Last Name"
                  formControlClassName={classes.field}
                  value={lastName}
                  onChange={inputChangeHandler}
                  fullWidth
                  label="Last Name"
                  id="lastName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  placeholder="Enter your email"
                  formControlClassName={classes.field}
                  value={email}
                  onChange={inputChangeHandler}
                  fullWidth
                  label="Email"
                  id="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordField
                  required
                  placeholder="Enter your password"
                  formControlClassName={classes.field}
                  value={password}
                  onChange={inputChangeHandler}
                  fullWidth
                  id="password"
                  label="Password"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  data-cy="signInButton"
                  className={classes.submit}
                  type="submit"
                  fullWidth
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;
