import jwt from "jsonwebtoken";

export const generateRandomNumber = (n) => {
  const add = 1;
  let max = 12 - add;

  if (n > max) {
    return generateRandomNumber(max) + generateRandomNumber(n - max);
  }

  max = 10 ** (n + add);
  const min = max / 10; // Math.pow(10, n) basically
  const number = Math.floor(Math.random() * (max - min + 1)) + min;
  const strNumber = `${number}`;
  return +strNumber.substring(0, strNumber.length - add);
};

export const generateToken = (payload, expiresIn) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  jwt.sign(payload, process.env.APP_SECRET, {
    expiresIn,
  });
