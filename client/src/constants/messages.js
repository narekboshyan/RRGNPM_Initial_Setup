export const SUCCESS_MESSAGES = {
  changedPassword: "Your password has been changed successfully.",
  saveChanges: "Your changes have been successfully saved.",
  successfullyDeleted: (name, count) =>
    `${count} ${count > 1 ? `${name}s are` : `${name} is`} successfully deleted.`,
  successfullyAdded: (actionName) => `User is successfully ${actionName}`,
};

export const ERROR_MESSAGES = {
  invalidEmailOrPassword: "Invalid email or password",
  invalidData: "Provided invalid data",
  invalidPassword: "Password should be at least 4 characters",
};

export const SNACKBAR_TYPE = {
  success: "success",
  error: "error",
};

export const SNACKBAR_MESSAGES = {
  filesSuccessfullyUploaded: "Files are successfully send",
  successfullySendMessage: "Your message is sent successfully",
  successfullySignedUp: "You have successfully signed up",
};
