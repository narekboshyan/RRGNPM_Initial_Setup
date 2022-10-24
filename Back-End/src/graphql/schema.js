import { makeExecutableSchema } from "@graphql-tools/schema";
import { DateTimeResolver } from "graphql-scalars";
import { gql } from "apollo-server-express";
import { inputs, types } from "./gql.js";
import { signin, signup } from "./auth/index.js";
import { user } from "./users/index.js";

const typeDefs = gql`
  ${types}
  ${inputs}
  type Query {
    user: Boolean
  }

  type Mutation {
    signin(data: SigninData!): User!
    signup(data: SignupData!): Boolean
  }

  scalar DateTime
  scalar JSON
  scalar JSONObject
  scalar Upload
`;

const resolvers = {
  Query: { user },
  Mutation: { signin, signup },
  DateTime: DateTimeResolver,
};

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

export { schema, typeDefs, resolvers };
