import { SIGN_IN_ROUTE } from "constants";
import { useAuth } from "hooks/useAuth";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getItemFromLocalStorage } from "utils";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  console.log(isLoggedIn, "isLoggedIn");

  return isLoggedIn ? children : <Navigate to={SIGN_IN_ROUTE} replace />;
};

export default PrivateRoute;
