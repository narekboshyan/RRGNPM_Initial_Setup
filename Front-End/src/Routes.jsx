import PrivateRoute from "components/PrivateRoute";
import { PROFILE_ROUTE } from "constants";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE, WORKSPACES_ROUTE } from "constants";
import Signin from "Pages/Auth/Signin";
import Signup from "Pages/Auth/Signup";
import Home from "Pages/Home";
import NotFound from "Pages/NotFound";
import Profile from "Pages/Profile";
import WorkSpaces from "Pages/WorkSpaces";
import CreateEditWorkSpace from "Pages/WorkSpaces/CreateEditWorkSpace";
import ViewWorkSpaces from "Pages/WorkSpaces/ViewWorkSpaces";
import React from "react";
import { useRoutes } from "react-router-dom";

const Routes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: SIGN_IN_ROUTE, element: <Signin /> },
    { path: SIGN_UP_ROUTE, element: <Signup /> },
    {
      path: WORKSPACES_ROUTE,
      element: (
        <PrivateRoute>
          <WorkSpaces />
        </PrivateRoute>
      ),
    },
    {
      path: PROFILE_ROUTE,
      element: (
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      ),
    },
    {
      path: `${WORKSPACES_ROUTE}/create`,
      element: (
        <PrivateRoute>
          <CreateEditWorkSpace />
        </PrivateRoute>
      ),
    },
    {
      path: `${WORKSPACES_ROUTE}/:id`,
      element: (
        <PrivateRoute>
          <ViewWorkSpaces />
        </PrivateRoute>
      ),
    },
    {
      path: `${WORKSPACES_ROUTE}/edit/:id`,
      element: (
        <PrivateRoute>
          <CreateEditWorkSpace />{" "}
        </PrivateRoute>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return routes;
};

export default Routes;
