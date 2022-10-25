import { SIGN_IN_ROUTE } from "constants";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getItemFromLocalStorage } from "utils";

const PrivateRoute = () => {
  // const { isLoggedIn } = useAuth();
  // const navigate = useNavigate();

  // if (!isLoggedIn) {
  //   return navigate(SIGN_IN_ROUTE);
  // }
  return <Outlet />;
};

export default PrivateRoute;
