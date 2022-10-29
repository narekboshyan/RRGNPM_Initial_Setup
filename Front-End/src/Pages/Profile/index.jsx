import React, { useEffect, useMemo, useState } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import PasswordField from "components/shared/Fields/PasswordFields";
import TextField from "components/shared/Fields/TextField";
import { SNACKBAR_TYPE } from "constants";
import { FETCH_LOADING_TEXT } from "constants";
import { UPLOAD_FILE } from "graphql/mutations";
import { DELETE_ACCOUNT, UPDATE_PROFILE_DATA } from "graphql/mutations/user";
import { GET_MY_PROFILE_DATA } from "graphql/queries/auth";
import { useMutationWithOnError, useQueryWithOnError } from "hooks/apollo";
import { useDispatch } from "react-redux";
import { addLoadingData, addSnackbar, removeLoadingData } from "redux/slices/shared";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "components/shared/dialog/ConfirmDialog";
import { deleteItemFromLocalStorage } from "utils";
import { SIGN_IN_ROUTE } from "constants";

const useStyles = makeStyles({
  containerRoot: {
    padding: 30,
  },
  center: {
    textAlign: "center",
  },
  avatar: {
    width: 250,
    height: "auto",
  },
  avatarContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
  },
});

const Profile = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);
  const { email, password, firstName, lastName } = formData;
  const [updateProfileData, { data: updatedQueryData, loading: signUpLoading }] =
    useMutationWithOnError(UPDATE_PROFILE_DATA);

  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    data: myProfileQueryData,
    loading: profileDataIsLoading,
    refetch,
  } = useQueryWithOnError(GET_MY_PROFILE_DATA, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (updatedQueryData?.signup) {
      dispatch(
        addSnackbar({
          type: SNACKBAR_TYPE.success,
          message: "Your profile data is successfully changed",
        })
      );
    }
  }, [updatedQueryData]);

  useEffect(() => {
    if (myProfileQueryData?.getProfileData) {
      const { email, firstName, lastName } = myProfileQueryData.getProfileData;
      setFormData((prevState) => ({ ...prevState, email, firstName, lastName }));
    }
  }, [myProfileQueryData]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await updateProfileData({
      variables: { data: formData },
    });
    refetch();
    setFormData((prevState) => ({ ...prevState, password: "" }));
  };
  const inputChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const [uploadProfilePicture, { data: uploadQueryData, loading: uploadLoading }] =
    useMutationWithOnError(UPLOAD_FILE);

  const [deleteAccount, { data: deleteAccountQueryData, loading: deleteAccountIsLoading }] =
    useMutationWithOnError(DELETE_ACCOUNT);

  useEffect(() => {
    if (deleteAccountQueryData?.deleteAccount) {
      deleteItemFromLocalStorage("token");
      navigate(SIGN_IN_ROUTE);
    }
  }, [deleteAccountQueryData]);

  const fileUploadHandler = async () => {
    if (file) {
      await uploadProfilePicture({
        variables: {
          file,
        },
      });
      setFile("");
      refetch();
    }
  };

  useEffect(() => {
    if (uploadQueryData?.uploadProfilePicture) {
      dispatch(
        addSnackbar({
          type: SNACKBAR_TYPE.success,
          message: "Profile picture has been successfully uploaded",
        })
      );
    }
  }, [uploadQueryData]);

  const profilePhotoName = useMemo(
    () => myProfileQueryData?.getProfileData.profilePicture?.name || "",
    [myProfileQueryData]
  );

  useEffect(() => {
    if (profileDataIsLoading || signUpLoading || uploadLoading || deleteAccountIsLoading) {
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
  }, [profileDataIsLoading, signUpLoading]);

  const confirmDeleteAccountHandler = async () => {
    await deleteAccount();
    setConfirmDeleteAccount(false);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid md={6} item>
          <form onSubmit={submitHandler} className={classes.containerRoot}>
            <Grid container spacing={2} display="flex" justifycontent="center">
              <Typography variant="h4" className={classes.center}>
                Profile Data
              </Typography>
              <Grid item xs={12}>
                <TextField
                  required
                  placeholder="Enter your First Name"
                  formControlClassName={classes.field}
                  value={firstName}
                  onChange={inputChangeHandler}
                  fullWidth
                  label="First Name"
                  id="firstName"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  placeholder="Enter your Last Name"
                  formControlClassName={classes.field}
                  value={lastName}
                  onChange={inputChangeHandler}
                  fullWidth
                  label="Last Name"
                  id="lastName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  placeholder="Enter your email"
                  formControlClassName={classes.field}
                  value={email}
                  onChange={inputChangeHandler}
                  fullWidth
                  label="Email"
                  id="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordField
                  required
                  placeholder="Enter your password"
                  formControlClassName={classes.field}
                  value={password}
                  onChange={inputChangeHandler}
                  fullWidth
                  id="password"
                  label="Password"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  className={classes.submit}
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Save changes
                </Button>
              </Grid>
            </Grid>
          </form>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => setConfirmDeleteAccount(true)}
          >
            Delete my account
          </Button>
        </Grid>
        <Grid md={6} item className={classes.avatarContent}>
          {profilePhotoName && (
            <img
              alt={profilePhotoName}
              src={`http://localhost:4000/profile-picture/${profilePhotoName}`}
              className={classes.avatar}
            />
          )}
          <input type="file" accept="image/*" onChange={(e) => setFile(...e.target.files)} />
          <Button variant="contained" color="primary" onClick={fileUploadHandler}>
            Upload
          </Button>
        </Grid>
      </Grid>

      <ConfirmDialog
        open={confirmDeleteAccount}
        title="Delete Account"
        onClose={() => setConfirmDeleteAccount(false)}
        onConfirm={confirmDeleteAccountHandler}
        confirmMessage="Are you sure you want to delete your account ?"
        cancelActionText="Cancel"
        confirmActionText="Delete"
      />
    </>
  );
};

export default Profile;
