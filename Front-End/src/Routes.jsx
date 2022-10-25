import PrivateRoute from "components/PrivateRoute";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE, WORKSPACES_ROUTE } from "constants";
import Login from "Pages/Auth/Signin";
import Signup from "Pages/Auth/Signup";
import WorkSpaces from "Pages/WorkSpaces";
import CreateEditWorkSpace from "Pages/WorkSpaces/CreateEditWorkSpace";
import ViewWorkSpaces from "Pages/WorkSpaces/ViewWorkSpaces";
import React from "react";
import { useRoutes } from "react-router-dom";

const Routes = () => {
  let element = useRoutes([
    { path: SIGN_IN_ROUTE, element: <Login /> },
    { path: SIGN_UP_ROUTE, element: <Signup /> },
    {
      path: WORKSPACES_ROUTE,
      element: <WorkSpaces />,
    },
    {
      path: "/workspace/create",
      element: <CreateEditWorkSpace />,
    },
    {
      path: "/workspaces/:id",
      element: <ViewWorkSpaces />,
    },
    {
      path: "/workspace/edit/:id",
      element: <CreateEditWorkSpace />,
    },
  ]);

  return element;
};

export default Routes;
