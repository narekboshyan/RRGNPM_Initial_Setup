const allOperationNames = [
  // Auth
  "signin",
  "signup",
];

if (allOperationNames.length !== new Set(allOperationNames).size) {
  throw new Error("Operation names should be unique");
}

export const operationNamesToPermissions = {
  // unAuthenticated
  signin: { unAuthenticated: true },
  signup: { unAuthenticated: true },
};
