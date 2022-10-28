import { makeExecutableSchema } from "@graphql-tools/schema";
import { DateTimeResolver } from "graphql-scalars";
import { gql } from "apollo-server-express";
import { inputs, types } from "./gql.js";
import { signin, signup, getMe } from "./auth/index.js";
import {
  createEditWorkspace,
  getWorkSpaces,
  deleteWorkSpace,
} from "./workSpace/index.js";
import { createEditChannels, getChannels } from "./channels/index.js";
import { uploadProfilePicture } from "./uploadProfilePicture/index.js";
import { inviteUser, updateProfileData, getProfileData } from "./user/index.js";

const typeDefs = gql`
  ${types}
  ${inputs}
  type Query {
    getMe: User!
    getProfileData: User!
    getWorkSpaces(id: Int): [WorkSpace!]!
    getChannels(workspaceId: Int!): [TypeChannel]
  }

  type Mutation {
    signin(data: SigninData!): User!
    signup(data: SignupData!): Boolean
    updateProfileData(data: SignupData!): Boolean
    createEditWorkspace(data: WorkspaceData!): Boolean
    deleteWorkSpace(id: Int!): Boolean
    createEditChannels(data: ChannelsData): Boolean
    uploadProfilePicture(file: Upload!): Boolean
    inviteUser(invitedUserEmail: String!, workspaceId: Int!): Boolean
  }

  scalar DateTime
  scalar JSON
  scalar JSONObject
  scalar Upload
`;

const resolvers = {
  Query: { getWorkSpaces, getMe, getChannels, getProfileData },
  Mutation: {
    signin,
    signup,
    updateProfileData,
    createEditWorkspace,
    deleteWorkSpace,
    createEditChannels,
    uploadProfilePicture,
    inviteUser,
  },
  DateTime: DateTimeResolver,
};

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

export { schema, typeDefs, resolvers };
