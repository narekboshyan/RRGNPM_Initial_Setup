import React from "react";
import { SIGN_IN_ROUTE } from "constants";
import { Navigate } from "react-router-dom";
import { getItemFromLocalStorage } from "utils";
import Header from "components/Layouts/Header";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = getItemFromLocalStorage("token");

  return isLoggedIn ? (
    <>
      <Header />
      {children}
    </>
  ) : (
    <Navigate to={SIGN_IN_ROUTE} replace />
  );
};

export default PrivateRoute;
