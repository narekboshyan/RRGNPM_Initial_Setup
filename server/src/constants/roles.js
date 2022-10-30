const allOperationNames = [
  // Auth
  "signin",
  "signup",
  "getMe",
  "getProfileData ",
  "getWorkSpaces ",
  "getChannels ",
  "updateProfileData ",
  "createEditWorkSpace ",
  "deleteWorkSpace ",
  "createEditChannels ",
  "uploadProfilePicture ",
  "inviteUser ",
  "deleteAccount ",
];

if (allOperationNames.length !== new Set(allOperationNames).size) {
  throw new Error("Operation names should be unique");
}

export const operationNamesToPermissions = {
  // unAuthenticated
  signin: { unAuthenticated: true },
  signup: { unAuthenticated: true },

  getMe: { authenticated: true },
  getProfileData: { authenticated: true },
  getWorkSpaces: { authenticated: true },
  getChannels: { authenticated: true },
  updateProfileData: { authenticated: true },
  createEditWorkSpace: { authenticated: true },
  deleteWorkSpace: { authenticated: true },
  createEditChannels: { authenticated: true },
  uploadProfilePicture: { authenticated: true },
  inviteUser: { authenticated: true },
  deleteAccount: { authenticated: true },
};
