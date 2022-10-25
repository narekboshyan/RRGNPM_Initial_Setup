import {
  Divider,
  Grid,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { List } from "@material-ui/icons";
import Button from "components/shared/Button/Button";
import { WORKSPACES_ROUTE } from "constants";
import { GET_WORKSPACES } from "graphql/queries/workSpaces";
import { useQueryWithOnError } from "hooks/apollo";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  workSpaceContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    gap: "20px",
  },
  workSpaceRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionContainer: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  workSpace: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    textDecoration: "none",
    color: "#000",
    gap: 5,
  },
  deleteIcon: {
    cursor: "pointer",
  },
});

const WorkSpaces = () => {
  const { data: workSpaceQueryData, loading: workSpaceIsLoading } =
    useQueryWithOnError(GET_WORKSPACES, {
      fetchPolicy: "no-cache",
    });

  const classes = useStyles();

  const workSpaceData = useMemo(
    () => workSpaceQueryData?.getWorkSpaces || [],
    [workSpaceQueryData]
  );

  console.log(workSpaceData, "workSpaceData");

  return (
    <Grid container>
      <Grid item md={8}>
        <Typography variant="h2">WorkSpaces</Typography>
        <Grid md={12} className={classes.workSpaceContainer}>
          {workSpaceData.map(({ name, subDomain, id }) => (
            <div className={classes.workSpaceRow}>
              <Link
                to={`${WORKSPACES_ROUTE}/${id}`}
                className={classes.workSpace}
                key={id}
              >
                <span>Name: {name}</span>
                <span>Unique Slug: {subDomain}</span>
                <Divider />
              </Link>
              <div className={classes.actionContainer}>
                <Link to={`/workspace/edit/${id}`}>
                  <EditIcon />
                </Link>
                <span className={classes.deleteIcon}>
                  <DeleteIcon />
                </span>
              </div>
            </div>
          ))}
        </Grid>
      </Grid>
      <Grid item md={4}>
        <Link to="/workspace/create">
          <Button>Create workspace</Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default WorkSpaces;
