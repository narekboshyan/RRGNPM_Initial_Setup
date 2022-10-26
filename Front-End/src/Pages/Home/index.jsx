import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "constants";
import React from "react";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  homePageContainer: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  nav: {
    display: "flex",
    gap: 10,
  },
});

const Home = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.homePageContainer}>
      <header>
        <nav className={classes.nav}>
          <Button
            variant="contained"
            component={Link}
            color="primary"
            to={SIGN_IN_ROUTE}
          >
            Sign in
          </Button>
          <Button
            variant="contained"
            component={Link}
            color="primary"
            to={SIGN_UP_ROUTE}
          >
            Sign up
          </Button>
        </nav>
      </header>
      <main>
        <Typography variant="h3">Home Page</Typography>
      </main>
    </Grid>
  );
};

export default Home;
