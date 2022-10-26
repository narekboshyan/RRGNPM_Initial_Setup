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

input WorkspaceData{
  id:     Int
  name:   String!
  subDomain:   String!
}

input ChannelsData{
  workspaceId: Int!
  channelsData: [ChannelType]
}

input ChannelType{
  name: String!
  workspaceId: Int!
}

`;
export const types = `
  type User{
    id: Int!
    ${userTypes}
    token : String!
  }

  type WorkSpace{
    id: Int!
    name: String!
    userId: Int!
    subDomain:  String!
    channels:[TypeChannel]
  }

  type TypeChannel{
    id:   Int!
    name: String!
    workspaceId: Int!
  }
`;
