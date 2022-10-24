import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "constants";
import React from "react";
import { Link } from "react-router-dom";
// import classes from "./index.scss";

const Home = () => {
  return (
    <header>
      <nav>
        <Link to={SIGN_IN_ROUTE}>Sign in</Link>
        <Link to={SIGN_UP_ROUTE}>Sign up</Link>
      </nav>
    </header>
  );
};

export default Home;
