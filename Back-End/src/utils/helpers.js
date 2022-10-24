import { prisma } from "../services/Prisma.js";
import jwt from "jsonwebtoken";

export const generateRandomNumber = (n) => {
  const add = 1;
  let max = 12 - add; // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

  if (n > max) {
    return generateRandomNumber(max) + generateRandomNumber(n - max);
  }

  max = 10 ** (n + add);
  const min = max / 10; // Math.pow(10, n) basically
  const number = Math.floor(Math.random() * (max - min + 1)) + min;
  const strNumber = `${number}`;
  return +strNumber.substring(0, strNumber.length - add);
};

export const generateToken = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.APP_SECRET, {
    expiresIn,
  });
};

export const validateUsername = async (username) => {
  let a = false;

  do {
    let check = await prisma.user.findFirst({ where: { username } });
    if (check) {
      //change username
      username += (+new Date() * Math.random()).toString().substring(0, 1);
      a = true;
    } else {
      a = false;
    }
  } while (a);
  return username;
};
