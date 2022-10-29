import CircularLoading from "components/shared/Loading";
import SharedSnackbar from "components/shared/Snackbar/SnackbarList";
import { GET_ME } from "graphql/queries";
import { useLazyQueryWithOnError } from "hooks/apollo";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "redux/slices/user";
import Routes from "Routes";
import { deleteItemFromLocalStorage, getItemFromLocalStorage } from "utils";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector(({ shared }) => shared);

  const [getMe, { data }] = useLazyQueryWithOnError(GET_ME, {
    onError() {
      deleteItemFromLocalStorage("token");
    },
    fetchPolicy: "network-only",
  });

  const getMeData = useMemo(() => data?.getMe || {}, [data]);

  useEffect(() => {
    if (getItemFromLocalStorage("token")) {
      getMe();
    }
  }, [getMe]);

  useEffect(() => {
    if (data) {
      dispatch(addUserData(getMeData));
    }
  }, [data, getMeData, dispatch]);

  return (
    <>
      <CircularLoading text={loading.text} open={loading.open} />
      <Routes />
      <SharedSnackbar />
    </>
  );
}

export default App;
