import { Button, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import TextField from "components/shared/Fields/TextField";
import { WORKSPACES_ROUTE } from "constants";
import { GET_WORKSPACES } from "graphql/queries";
import { useMutationWithOnError, useQueryWithOnError } from "hooks/apollo";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { channelReducer, CHANNEL_TYPE, matchEmail } from "utils";
import { CREATE_EDIT_CHANNELS } from "graphql/mutations";
import { addLoadingData, addSnackbar, removeLoadingData } from "redux/slices/shared";
import { FETCH_LOADING_TEXT } from "constants";
import { useDispatch } from "react-redux";
import { SNACKBAR_TYPE } from "constants";
import { INVITE_USER } from "graphql/mutations";

const useStyles = makeStyles({
  container: {
    marginTop: 20,
    padding: 10,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  formGroup: {
    width: "70%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
  },
  btn: {
    alignSelf: "end",
    cursor: "pointer",
    padding: 5,
  },
  createEditWorkspaceContainer: {
    padding: 5,
  },
  inviteUserContainer: {
    display: "flex",
    alignItems: "end",
  },
});

const ViewWorkSpaces = () => {
  const [userEmail, setUserEmail] = useState("");
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [channelsFormData, dispatchChannelsFormData] = useReducer(channelReducer, [
    {
      id: v4(),
      name: "",
      workspaceId: +id,
    },
  ]);

  const {
    data: workSpaceQueryData,
    loading: workSpaceIsLoading,
    refetch,
  } = useQueryWithOnError(GET_WORKSPACES, {
    fetchPolicy: "no-cache",
    variables: {
      id: +id,
    },
  });

  const channels = useMemo(
    () => workSpaceQueryData?.getWorkSpaces[0]?.channels || [],
    [workSpaceQueryData]
  );

  useEffect(() => {
    if (workSpaceQueryData?.getWorkSpaces[0]?.channels.length) {
      dispatchChannelsFormData({
        type: CHANNEL_TYPE.setChannelsData,
        payload: {
          channelsData: channels.map(({ id, name }) => ({ id, name })),
        },
      });
    }
  }, [channels, workSpaceQueryData]);

  const [createEditChannels, { data: createEditChannelsQueryData, loading: createEditIsLoading }] =
    useMutationWithOnError(CREATE_EDIT_CHANNELS);

  const [inviteUser, { data: inviteUserQueryData, loading: inviteUserIsLoading }] =
    useMutationWithOnError(INVITE_USER);

  useEffect(() => {
    if (inviteUserQueryData?.inviteUser) {
      dispatch(
        addSnackbar({
          type: SNACKBAR_TYPE.success,
          message: "User has been successfully invited",
        })
      );
    }
  }, [inviteUserQueryData, dispatch]);

  useEffect(() => {
    if (createEditIsLoading || workSpaceIsLoading || inviteUserIsLoading) {
      dispatch(
        addLoadingData({
          key: "createEditIsLoading",
          text: FETCH_LOADING_TEXT,
          open: true,
        })
      );
    } else {
      dispatch(removeLoadingData("createEditIsLoading"));
    }
  }, [createEditIsLoading, dispatch, workSpaceIsLoading, inviteUserIsLoading]);

  const workSpaceData = useMemo(
    () => workSpaceQueryData?.getWorkSpaces[0] || {},
    [workSpaceQueryData]
  );

  const invalidChannelData = useMemo(
    () => !!channelsFormData.find(({ name }) => !name),
    [channelsFormData]
  );

  const channelSubmitHandler = async (e) => {
    e.preventDefault();

    if (invalidChannelData) {
      dispatch(
        addSnackbar({
          type: SNACKBAR_TYPE.error,
          message: "Invalid channel data",
        })
      );
      return;
    }
    await createEditChannels({
      variables: {
        data: {
          channelsData: channelsFormData.map(({ name }) => ({
            name,
            workspaceId: +id,
          })),
          workspaceId: +id,
        },
      },
    });
    refetch();
  };

  useEffect(() => {
    if (createEditChannelsQueryData?.createEditChannels) {
      dispatch(
        addSnackbar({
          type: SNACKBAR_TYPE.success,
          message: "Your changes are successfully saved",
        })
      );
      navigate(WORKSPACES_ROUTE);
    }
  }, [createEditChannelsQueryData, dispatch, navigate]);

  const inviteUserSubmitHandler = async (e) => {
    e.preventDefault();
    if (matchEmail(userEmail)) {
      dispatch(
        addSnackbar({
          type: SNACKBAR_TYPE.error,
          message: "Invalid email address",
        })
      );
      return;
    }
    await inviteUser({
      variables: {
        invitedUserEmail: userEmail,
        workspaceId: +id,
      },
    });

    setUserEmail("");
  };

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item md={6}>
        <Grid container spacing={4}>
          <Grid item md={12}>
            <Typography variant="h4">Workspace Details</Typography>
            <Typography variant="h5">Name: {workSpaceData.name}</Typography>
            <Typography variant="h5">SubDomain: {workSpaceData.subDomain}</Typography>
            <Divider />
          </Grid>
          <Grid item md={12}>
            <Typography variant="h4" className={classes.typoGraphy}>
              Invite User
            </Typography>
            <form onSubmit={inviteUserSubmitHandler} className={classes.inviteUserContainer}>
              <TextField
                required
                formControlClassName={classes.field}
                placeholder="Enter user email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                label="Fill user email"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.inviteUserBtn}
              >
                Invite
              </Button>
            </form>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={6}>
        <form onSubmit={channelSubmitHandler} className={classes.form}>
          {channelsFormData.map(({ name, id }) => (
            <div className={classes.formGroup} key={id}>
              <TextField
                required
                placeholder="Channel Name"
                value={name}
                onChange={(e) =>
                  dispatchChannelsFormData({
                    type: CHANNEL_TYPE.channelChangeHandler,
                    payload: {
                      id,
                      value: e.target.value,
                    },
                  })
                }
                fullWidth
                label="Channel Name"
                id="name"
                autoComplete="name"
                autoFocus
              />
              <span
                onClick={() =>
                  dispatchChannelsFormData({
                    type: CHANNEL_TYPE.removeChannel,
                    payload: { id },
                  })
                }
                className={classes.btn}
              >
                <DeleteIcon />
              </span>
            </div>
          ))}
          <Button
            className={classes.btn}
            color="primary"
            variant="outlined"
            onClick={() => dispatchChannelsFormData({ type: CHANNEL_TYPE.addChannel })}
          >
            Add new channel
          </Button>
          {channelsFormData.length > 0 && (
            <Button type="submit" className={classes.btn} color="primary" variant="contained">
              Submit
            </Button>
          )}
        </form>
      </Grid>
    </Grid>
  );
};

export default ViewWorkSpaces;
