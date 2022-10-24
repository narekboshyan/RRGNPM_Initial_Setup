import CircularLoading from "components/shared/Loading";
import SharedSnackbar from "components/shared/Snackbar/SnackbarList";
import React from "react";
import { Suspense } from "react";
import Routes from "Routes";

function App() {
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
