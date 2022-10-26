import { prisma } from "../services/Prisma.js";
import { ERROR_MESSAGES } from "../constants/errors.js";
import { getUserId } from "../utils/auth.js";
import { InvalidDataError } from "../errors/InvalidDataError.js";
import { operationNamesToPermissions } from "../constants/roles.js";
import { PermissionDeniedError } from "../errors/PermissionDeniedError.js";

const getUnAuthenticatedContext = async (operationName, userId) => {
  if (operationName === "getMe") {
    if (!userId) {
      throw new InvalidDataError(ERROR_MESSAGES.invalidToken);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new InvalidDataError(ERROR_MESSAGES.invalidToken);
    }
    return {
      prisma,
      user,
      operationName,
    };
  }
  return {
    prisma,
    operationName,
  };
};

export const context = async ({ req }) => {
  try {
    const { operationName } = req.body;
    if (
      operationName === "IntrospectionQuery" &&
      process.env.NODE_ENV === "development"
    ) {
      return { prisma };
    }

    const userId =
      (req.headers && req.headers.authorization) || req.query.token
        ? getUserId(req, req.query.token)
        : null;

    const { unAuthenticated } =
      operationNamesToPermissions[operationName] || {};

    if (unAuthenticated) {
      const unAuthenticatedContext = await getUnAuthenticatedContext(
        operationName,
        userId
      );

      return unAuthenticatedContext;
    }

    if (!userId) {
      throw new InvalidDataError(ERROR_MESSAGES.invalidToken);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new InvalidDataError(ERROR_MESSAGES.invalidUserId);
    }

    return {
      prisma,
      user,
    };
  } catch (error) {
    console.log(error);
    return { contextError: error };
  }
};
