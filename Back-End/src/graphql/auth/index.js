import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getMe = async (_parent, _args, context) => {
  const { user } = context;
  if (!user) return null;
  return user;
};

export const signup = async (
  _parent,
  {
    data: {
      email,
      password,
      firstName,
      lastName,
      invitationCode,
      invitedUserEmail,
    },
  },
  context
) => {
  const { prisma } = context;
  const hashedPassword = await bcrypt.hash(password, 12);

  if (invitationCode && invitedUserEmail) {
    const invitedUser = await prisma.user.findUnique({
      where: {
        invitationCode: +invitationCode,
      },
    });

    console.log(invitedUser, "invitedUser");

    if (!invitedUser) {
      throw new Error("Entered credentials are not valid");
    }

    const updatedInvitedUser = await prisma.user.update({
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

    console.log(updatedInvitedUser);

    return true;
  }

  try {
    const emailAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailAlreadyExists) {
      throw new Error("Email already exists");
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

export const signin = async (
  _parent,
  { data: { email, password } },
  context
) => {
  const { prisma } = context;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Email or password is not valid");
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new Error("Email or password is not valid");
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return {
    ...user,
    token,
  };
};
