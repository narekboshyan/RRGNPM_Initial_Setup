const userTypes = `
    firstName: String!
    lastName:  String!
    email:     String!
`;

export const inputs = `
input SigninData {
  email:    String!
  password: String!
}

input SignupData{
  email:    String!
  password: String!
  firstName: String!
  lastName: String!
}
`;
export const types = `
  type User{
    id: Int!
    ${userTypes}
    token : String!
  }
`;
