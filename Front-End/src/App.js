import CircularLoading from "components/shared/Loading";
import SharedSnackbar from "components/shared/Snackbar/SnackbarList";
import { GET_ME } from "graphql/queries/auth";
import { useLazyQueryWithOnError } from "hooks/apollo";
import React, { useEffect, useMemo } from "react";
import { Suspense } from "react";
import { useDispatch } from "react-redux";
import { addUserData } from "redux/slices/user";
import Routes from "Routes";
import { deleteItemFromLocalStorage, getItemFromLocalStorage } from "utils";

function App() {
  const dispatch = useDispatch();

  const [getMe, { data }] = useLazyQueryWithOnError(GET_ME, {
    onError() {
      deleteItemFromLocalStorage("token");
    },
    fetchPolicy: "network-only",
  });

  const getMeData = useMemo(() => data?.getMe || {}, [data]);

  // useEffect(() => {
  //   if (getItemFromLocalStorage("token")) {
  //     getMe();
  //   }
  // }, [getMe]);

  // useEffect(() => {
  //   if (data) {
  //     dispatch(addUserData(getMeData));
  //   }
  // }, [data, getMeData, dispatch]);

  return (
    <>
      <Suspense fallback={<CircularLoading />}>
        <SharedSnackbar />
        <Routes />
      </Suspense>
    </>
  );
}

export default App;
