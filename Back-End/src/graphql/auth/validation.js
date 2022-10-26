import Ajv from "ajv/dist/jtd.js";
const ajv = new Ajv();

export const validator = (args) => {
  const schema = {
    type: "object",
    properties: {
      first_name: "string",
      last_name: "string",
      username: {
        type: "string",
        minLength: 4,
        description: "username should be at least 4 characters",
      },
      gender: "string",
      birthDate: { type: "string", format: "date" },
      email: {
        type: "string",
        format: "email",
        description: "User account email address",
      },
      password: {
        type: "string",
        minLength: 4,
        description: "User password",
      },
    },
    required: [
      "first_name",
      "last_name",
      "username",
      "email",
      "password",
      "gender",
    ],
    additionalProperties: false,
  };

  const valid = ajv.validate(schema, args);
  if (!valid) {
    return false;
  }
  return true;
};
