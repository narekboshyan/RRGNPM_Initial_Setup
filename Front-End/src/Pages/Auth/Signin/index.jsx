import TextField from "components/shared/Fields/TextField";
import React, { useEffect, useState } from "react";
import Button from "components/shared/Button/Button";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import PasswordField from "components/shared/Fields/PasswordFields";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { addUserData } from "redux/slices/user";
import {
  DARK_BLUE_COLOR,
  LIGHT_BLUE_COLOR,
  WHITE_COLOR,
  FETCH_LOADING_TEXT,
  SNACKBAR_TYPE,
  WORKSPACES_ROUTE,
} from "constants/index";
import {
  EMAIL_CONFIRMATION,
  SIGN_IN,
  TWO_FACTOR_AUTH,
} from "graphql/mutations/auth";
import { useDispatch } from "react-redux";
import {
  addLoadingData,
  addSnackbar,
  removeLoadingData,
} from "redux/slices/shared";
import { useFetchMutation } from "hooks/useFetch";
import AddUser from "components/shared/AddUser";

const useStyles = makeStyles(() => ({
  confirmationContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  containerRoot: {
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

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const [confirmCode, setConfirmCode] = useState("");
  const [openConfirmationMessage, setOpenConfirmationMessage] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {
    mutation: signIn,
    data: signInQueryData,
    loading: signInIsLoading,
  } = useFetchMutation(SIGN_IN);

  const { email, password } = formData;
  const classes = useStyles();

  // useEffect(() => {
  //   if (search) {
  //     (async () => {
  //       await confirmEmail({
  //         variables: {
  //           confirmationCode: +new URLSearchParams(search).get("confirmCode"),
  //         },
  //       });
  //     })();
  //   }
  // }, [search, confirmEmail]);

  useEffect(() => {
    if (signInIsLoading) {
      dispatch(
        addLoadingData({
          key: "signInIsLoading",
          text: FETCH_LOADING_TEXT,
          open: true,
        })
      );
    } else {
      dispatch(removeLoadingData("signInIsLoading"));
    }
  }, [signInIsLoading, dispatch]);

  const inputChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    if (signInQueryData?.signin) {
      dispatch(addUserData(signInQueryData.signin));
      navigate(WORKSPACES_ROUTE);
    }
  }, [signInQueryData, navigate, dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await signIn({
      variables: { data: formData },
    });
  };

  return (
    <>
      <Grid sx={{ height: "100vh", overflow: "hidden" }}>
        <div className={classes.topPartRoot}>
          <div className={classes.checkAccountText}>
            Don&apos;t have an account?
          </div>
          <Link to="/signup" className={classes.link}>
            <Button textColor={LIGHT_BLUE_COLOR} bgColor={WHITE_COLOR}>
              SIGN UP
            </Button>
          </Link>
        </div>
        <Grid
          container
          display="flex"
          sx={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <form onSubmit={submitHandler} className={classes.containerRoot}>
            <Grid container spacing={2} justifycontent="center">
              <Typography variant="h4" className={classes.center}>
                Sign in
              </Typography>
              <Grid item xs={12}>
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
                  autoFocus
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
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <div className={classes.forgotPassword}>
                  <Link
                    data-cy="recoverPassword"
                    className={classes.forgotPasswordLink}
                    to="/recover-password"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Button
                  data-cy="signInButton"
                  className={classes.submit}
                  type="submit"
                  fullWidth
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;
