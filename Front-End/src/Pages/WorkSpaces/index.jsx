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
import { useMutationWithOnError, useQueryWithOnError } from "hooks/apollo";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DELETE_WORKSPACES, UPLOAD_FILES } from "graphql/mutations";
import { useDispatch } from "react-redux";
import { addLoadingData, removeLoadingData } from "redux/slices/shared";
import {
  DARK_BLUE_COLOR,
  DARK_RED_COLOR,
  FETCH_LOADING_TEXT,
  GRAY_COLOR,
  LIGHTEN_GRAY_COLOR,
} from "constants/index";
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
    // justifyContent: "end",
  },
  dragDrop: {
    marginTop: 30,
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

  const [
    deleteWorkSpace,
    { data: deleteQueryData, loading: deleteWorkSpaceIsLoading },
  ] = useMutationWithOnError(DELETE_WORKSPACES);

  const workSpaceData = useMemo(
    () => workSpaceQueryData?.getWorkSpaces || [],
    [workSpaceQueryData]
  );

  const deleteWorkspaceHandler = async (id) => {
    await deleteWorkSpace({
      variables: { id },
    });
    refetch();
  };

  const [uploadFiles, { data: uploadQueryData, loading: uploadLoading }] =
    useMutationWithOnError(UPLOAD_FILES);

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
      <Typography variant="h2">WorkSpaces</Typography>
      <Grid container>
        <Grid md={8} className={classes.workSpaceContainer}>
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
                <span
                  className={classes.deleteIcon}
                  onClick={() => setOpenConfirmDialog(id)}
                >
                  <DeleteIcon />
                </span>
              </div>
            </div>
          ))}
          <ReactDragDropUpload
            className={classes.dragDrop}
            onFileChange={fileChangeHandler}
            loading={uploadLoading}
            response={!!uploadQueryData}
          />
        </Grid>
        <Grid md={4} className={classes.createWorkSpaceBtn}>
          <Button
            component={Link}
            color="primary"
            variant="contained"
            to="/workspace/create"
          >
            Create workspace
          </Button>
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
        cancelActionProps={{
          textColor: DARK_BLUE_COLOR,
          bgColor: LIGHTEN_GRAY_COLOR,
          borderColor: GRAY_COLOR,
        }}
        confirmActionProps={{
          bgColor: DARK_RED_COLOR,
          borderColor: DARK_RED_COLOR,
        }}
      />
    </>
  );
};

export default WorkSpaces;
