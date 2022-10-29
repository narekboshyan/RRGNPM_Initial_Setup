import TextField from "components/shared/Fields/TextField";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import PasswordField from "components/shared/Fields/PasswordFields";
import { Link, useNavigate } from "react-router-dom";
import { addUserData } from "redux/slices/user";
import { DARK_BLUE_COLOR, FETCH_LOADING_TEXT, WORKSPACES_ROUTE } from "constants/index";
import { SIGN_IN } from "graphql/mutations/auth";
import { useDispatch } from "react-redux";
import { addLoadingData, removeLoadingData } from "redux/slices/shared";
import { useMutationWithOnError } from "hooks/apollo";

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

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [signIn, { data: signInQueryData, loading: signInIsLoading }] =
    useMutationWithOnError(SIGN_IN);
  const { email, password } = formData;
  const classes = useStyles();

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
          <div className={classes.checkAccountText}>Don&apos;t have an account?</div>
          <Link to="/signup" className={classes.link}>
            <Button variant="contained" color="primary">
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
                <Button
                  variant="contained"
                  color="primary"
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
