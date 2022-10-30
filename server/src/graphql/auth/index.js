import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import { ERROR_MESSAGES } from "../../constants/errors.js";
import { InvalidDataError } from "../../errors/InvalidDataError.js";
import { AuthorizationError } from "../../errors/AuthorizationError.js";

export const getMe = async (_parent, _args, context) => {
  const { user } = context;
  if (!user) return null;
  return user;
};

export const signup = async (
  _parent,
  { data: { email, password, firstName, lastName, invitationCode, invitedUserEmail } },
  context
) => {
  const { prisma } = context;

  if (!validator.isEmail(email)) {
    throw new InvalidDataError(ERROR_MESSAGES.invalidEmail, { capturing: false });
  } else if (
    validator.isEmpty(firstName) ||
    validator.isEmpty(lastName) ||
    !validator.isLength(password, { min: 4 })
  ) {
    throw new InvalidDataError(ERROR_MESSAGES.invalidData);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  if (invitationCode && invitedUserEmail) {
    const invitedUser = await prisma.user.findUnique({
      where: {
        invitationCode: +invitationCode,
      },
    });

    if (!invitedUser) {
      throw new InvalidDataError(ERROR_MESSAGES.invalidData);
    }

    await prisma.user.update({
      where: {
        id: invitedUser.id,
      },
      data: {
        firstName,
        lastName,
        password: hashedPassword,
        invitationCode: null,
      },
    });

    return true;
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new InvalidDataError(ERROR_MESSAGES.userAlreadyExists, { capturing: false });
    }

    await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const signin = async (_parent, { data: { email, password } }, context) => {
  const { prisma } = context;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AuthorizationError(ERROR_MESSAGES.invalidPassword, { capturing: false });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new AuthorizationError(ERROR_MESSAGES.invalidPassword, { capturing: false });
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return {
    ...user,
    token,
  };
};
