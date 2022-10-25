import { makeStyles } from "@material-ui/core";
import Button from "components/shared/Button/Button";
import TextField from "components/shared/Fields/TextField";
import { WORKSPACES_ROUTE } from "constants";
import { CREATE_WORKSPACES } from "graphql/mutations";
import { GET_WORKSPACES } from "graphql/queries/workSpaces";
import { useMutationWithOnError, useQueryWithOnError } from "hooks/apollo";
import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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
    subDomain: "",
    id: null,
  });
  const classes = useStyles();
  const navigate = useNavigate();

  const { name, subDomain } = workSpaceData;
  const { id } = useParams();

  const { data: workSpaceQueryData, loading: workSpaceIsLoading } =
    useQueryWithOnError(GET_WORKSPACES, {
      fetchPolicy: "no-cache",
      variables: {
        id: +id,
      },
      skip: !id,
    });

  const workSpaceFetchedData = useMemo(
    () => workSpaceQueryData?.getWorkSpaces[0] || {},
    [workSpaceQueryData]
  );

  useEffect(() => {
    if (workSpaceQueryData?.getWorkSpaces) {
      const { name, subDomain, id } = workSpaceFetchedData;
      setWorkSpaceData({ name, subDomain, id });
    }
  }, [workSpaceFetchedData, workSpaceQueryData]);

  const [createWorkspace, { data: signInQueryData, loading: signInIsLoading }] =
    useMutationWithOnError(CREATE_WORKSPACES);

  useEffect(() => {
    if (signInQueryData) {
      navigate(WORKSPACES_ROUTE);
    }
  }, [signInQueryData, navigate]);

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
              placeholder="subDomain"
              value={subDomain}
              onChange={inputChangeHandler}
              fullWidth
              label="subDomain"
              id="subDomain"
              autoComplete="subDomain"
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
