import React, { useMemo } from "react";
import { Z_INDEX_INCREASED_FOR_LOADER } from "constants/index";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  loaderRoot: {
    position: ({ fullScreen }) => (fullScreen ? "fixed" : "absolute"),
    display: "flex",
    zIndex: theme.zIndex.drawer + Z_INDEX_INCREASED_FOR_LOADER,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    cursor: "default",
    flexDirection: "column",
    backdropFilter: "blur(2px)",
    backgroundColor: "rgba(250, 251, 255, 0.3)",
    fontSize: 20,
    fontWeight: 500,
  },
}));

const CircularLoading = ({ fullScreen = true }) => {
  const classes = useStyles({ fullScreen });

  const { loading } = useSelector(({ shared }) => shared);

  const text = useMemo(
    () =>
      Object.values(loading).find((val) => val?.open)?.text || "Please wait...",
    [loading]
  );

  const open = useMemo(
    () => Object.values(loading).some((val) => val?.open),
    [loading]
  );

  if (!open) {
    return <h1>LOADING</h1>;
  }

  return (
    <div
      className={classes.loaderRoot}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <CircularProgress />
      {text}
    </div>
  );
};
export default CircularLoading;
