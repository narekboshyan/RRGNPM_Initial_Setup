import React from "react";
import { useSelector } from "react-redux";
import SnackbarItem from "./SnackbarItem";

const SharedSnackbar = () => {
  const snackBarList = useSelector((state) => state.common.data);

  return (
    <>
      {snackBarList.map(({ message, type, id }, i) => (
        <SnackbarItem key={id} message={message} type={type} id={id} index={i} />
      ))}
    </>
  );
};

export default SharedSnackbar;
