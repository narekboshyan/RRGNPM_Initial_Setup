import { Button, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { WORKSPACES_ROUTE } from "constants";
import { GET_WORKSPACES } from "graphql/queries/workSpaces";
import { useMutationWithOnError, useQueryWithOnError } from "hooks/apollo";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DELETE_WORKSPACES, UPLOAD_FILES } from "graphql/mutations";
import { useDispatch } from "react-redux";
import { addLoadingData, addSnackbar, removeLoadingData } from "redux/slices/shared";
import { SNACKBAR_TYPE, FETCH_LOADING_TEXT } from "constants/index";
import ConfirmDialog from "components/shared/dialog/ConfirmDialog";
import ReactDragDropUpload from "components/shared/ReactDragDropUpload";

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
  createWorkSpaceBtn: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    gap: 30,
  },
  dragDrop: {
    marginTop: 30,
    flex: 1,
    width: "100%",
  },
  typoGraphy: {
    textAlign: "center",
  },
  inviteUserBtn: {
    display: "flex",
    alignItems: "end",
  },
});

const WorkSpaces = () => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(null);
  const {
    data: workSpaceQueryData,
    loading: workSpaceIsLoading,
    refetch,
  } = useQueryWithOnError(GET_WORKSPACES, {
    fetchPolicy: "no-cache",
  });

  const classes = useStyles();
  const dispatch = useDispatch();

  const [deleteWorkSpace, { data: deleteQueryData, loading: deleteWorkSpaceIsLoading }] =
    useMutationWithOnError(DELETE_WORKSPACES);

  useEffect(() => {
    if (deleteQueryData?.deleteWorkSpace) {
      dispatch(
        addSnackbar({
          type: SNACKBAR_TYPE.success,
          message: "Workspace is successfully deleted",
        })
      );
    }
  }, [deleteQueryData, dispatch]);

  const workSpaceData = useMemo(() => workSpaceQueryData?.getWorkSpaces || [], [workSpaceQueryData]);

  const deleteWorkspaceHandler = async (id) => {
    await deleteWorkSpace({
      variables: { id },
    });
    refetch();
  };

  const [uploadFiles, { data: uploadQueryData, loading: uploadLoading }] = useMutationWithOnError(UPLOAD_FILES);

  useEffect(() => {
    if (deleteWorkSpaceIsLoading || workSpaceIsLoading) {
      dispatch(
        addLoadingData({
          key: "deleteWorkSpaceIsLoading",
          text: FETCH_LOADING_TEXT,
          open: true,
        })
      );
    } else {
      dispatch(removeLoadingData("deleteWorkSpaceIsLoading"));
    }
  }, [deleteWorkSpaceIsLoading, dispatch, workSpaceIsLoading]);

  const fileChangeHandler = async (files) => {
    await uploadFiles({
      variables: {
        files,
      },
    });
  };

  return (
    <>
      <Typography variant="h3" className={classes.typoGraphy}>
        WorkSpace Page
      </Typography>
      <Grid container>
        <Grid item md={7} className={classes.workSpaceContainer}>
          <Typography variant="h5" className={classes.typoGraphy}>
            WorkSpace list
          </Typography>
          {workSpaceData.map(({ name, subDomain, id }) => (
            <div className={classes.workSpaceRow} key={id}>
              {console.log(WORKSPACES_ROUTE, id)}
              <Link to={`${WORKSPACES_ROUTE}/${id}`} className={classes.workSpace}>
                <span>Name: {name}</span>
                <span>Unique Slug: {subDomain}</span>
                <Divider />
              </Link>
              <div className={classes.actionContainer}>
                <Link to={`${WORKSPACES_ROUTE}/edit/${id}`}>
                  <EditIcon />
                </Link>
                <span className={classes.deleteIcon} onClick={() => setOpenConfirmDialog(id)}>
                  <DeleteIcon />
                </span>
              </div>
            </div>
          ))}
        </Grid>
        <Grid md={5} item className={classes.createWorkSpaceBtn}>
          <Grid>
            <Button component={Link} color="primary" variant="contained" to={`${WORKSPACES_ROUTE}/create`}>
              Create workspace
            </Button>
          </Grid>
          <Grid className={classes.dragDrop}>
            <Typography variant="h4" className={classes.typoGraphy}>
              Upload files{" "}
            </Typography>
            <ReactDragDropUpload
              onFileChange={fileChangeHandler}
              loading={uploadLoading}
              response={!!uploadQueryData}
            />
          </Grid>
        </Grid>
      </Grid>

      <ConfirmDialog
        open={openConfirmDialog}
        title="Delete workspace"
        onClose={() => setOpenConfirmDialog(null)}
        onConfirm={() => {
          deleteWorkspaceHandler(openConfirmDialog);
          setOpenConfirmDialog(null);
        }}
        confirmMessage="Are you sure you want to delete this workspace,and all it's related channels ?"
        cancelActionText="Cancel"
        confirmActionText="Delete"
      />
    </>
  );
};

export default WorkSpaces;
