import { makeStyles } from "@material-ui/core";
import Button from "components/shared/Button/Button";
import TextField from "components/shared/Fields/TextField";
import { WORKSPACES_ROUTE } from "constants";
import { CREATE_WORKSPACES } from "graphql/mutations";
import { useMutationWithOnError } from "hooks/apollo";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  formControl: { width: "40%", margin: "50px auto" },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {},
  formButton: {},
});

const CreateEditWorkSpace = () => {
  const [workSpaceData, setWorkSpaceData] = useState({
    name: "",
    slag: "",
  });
  const classes = useStyles();
  const navigate = useNavigate();

  const { name, slag } = workSpaceData;

  const [createWorkspace, { data: signInQueryData, loading: signInIsLoading }] =
    useMutationWithOnError(CREATE_WORKSPACES);

  useEffect(() => {
    if (signInQueryData) {
      navigate(WORKSPACES_ROUTE);
    }
  }, [signInQueryData, navigate]);

  useEffect(() => {});

  const inputChangeHandler = (e) => {
    setWorkSpaceData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const workSpaceSubmitHandler = async (e) => {
    e.preventDefault();
    await createWorkspace({
      variables: {
        data: workSpaceData,
      },
    });
  };

  return (
    <>
      <Link to={WORKSPACES_ROUTE}>Back</Link>
      <div className={classes.formControl}>
        <form onSubmit={workSpaceSubmitHandler} className={classes.form}>
          <div className={classes.formGroup}>
            <TextField
              required
              placeholder="Name"
              value={name}
              onChange={inputChangeHandler}
              fullWidth
              label="Name"
              id="name"
              autoComplete="name"
              autoFocus
            />
          </div>
          <div className={classes.formGroup}>
            <TextField
              required
              placeholder="Slag"
              value={slag}
              onChange={inputChangeHandler}
              fullWidth
              label="Slag"
              id="slag"
              autoComplete="slag"
            />
          </div>
          <div className={classes.formButton}>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateEditWorkSpace;
