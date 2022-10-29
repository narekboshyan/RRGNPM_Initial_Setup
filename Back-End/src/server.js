import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloError } from "apollo-server-errors";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import path, { resolve } from "path";
import { schema } from "./graphql/schema.js";
import { context } from "./graphql/context.js";
import "./utils/auth.js";
import { ERROR_CODES } from "./constants/errors.js";
import "./env.js";

const app = express();
app.use(express.json());

const dirname = resolve();

app.use("/images", express.static(path.join(dirname, "/src/uploads")));

const allowed = ["http://localhost:3000", "http://localhost:4000"];

const port = process.env.PORT || 4000;

let apolloServer = null;
async function startServer() {
  app.use(graphqlUploadExpress());
  apolloServer = new ApolloServer({
    schema,
    context,
    introspection: true,
    playground: true,
    cors: {
      origin: allowed,
      credentials: true,
    },
    plugins: [
      {
        requestDidStart() {
          return {
            didEncounterErrors(ctx) {
              if (!ctx.operation) {
                return;
              }
              for (const err of ctx.errors) {
                if (process.env.NODE_ENV === "development") {
                  console.log(err);
                }
              }
            },
          };
        },
      },
    ],
    formatError: (err) => {
      if (process.env.NODE_ENV === "development") {
        console.log(err);
        return err;
      }
      if (
        err.originalError instanceof ApolloError &&
        Object.values(ERROR_CODES).includes(err.extensions.code)
      ) {
        // eslint-disable-next-line
        err.message = err.message.replace("Context creation failed: ", "");
        return err;
      }

      return { message: err.message, status: err.status };
    },
    formatResponse: (res, reqCtx) => {
      if (reqCtx.context.contextError) {
        const {
          message = "",
          extensions = {},
          // eslint-disable-next-line no-shadow
          path = [],
          locations = [],
        } = reqCtx.context.contextError;
        return {
          data: null,
          errors: [{ message, locations, path, extensions }],
        };
      }

      return null;
    },
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

app.listen({ port }, async () => {
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
});
