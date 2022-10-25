import { makeExecutableSchema } from "@graphql-tools/schema";
import { DateTimeResolver } from "graphql-scalars";
import { gql } from "apollo-server-express";
import { inputs, types } from "./gql.js";
import { signin, signup, getMe } from "./auth/index.js";
import { createWorkspace, getWorkSpaces } from "./workSpace/index.js";
import { user } from "./users/index.js";

const typeDefs = gql`
  ${types}
  ${inputs}
  type Query {
    getMe: User!
    user: Boolean
    getWorkSpaces(id: Int): [WorkSpace!]!
  }

  type Mutation {
    signin(data: SigninData!): User!
    signup(data: SignupData!): Boolean
    createWorkspace(data: WorkspaceData!): Boolean
  }

  scalar DateTime
  scalar JSON
  scalar JSONObject
  scalar Upload
`;

const resolvers = {
  Query: { user, getWorkSpaces, getMe },
  Mutation: { signin, signup, createWorkspace },
  DateTime: DateTimeResolver,
};

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

export { schema, typeDefs, resolvers };
