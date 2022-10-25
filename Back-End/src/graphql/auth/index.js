import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getMe = async (_parent, _args, context) => {
  const { user } = context;
  if (!user) return null;
  return user;
};

export const signup = async (
  _parent,
  { data: { email, password, firstName, lastName } },
  context
) => {
  const { prisma } = context;

  try {
    const emailAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailAlreadyExists) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

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
