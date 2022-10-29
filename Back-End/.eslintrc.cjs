module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "import/extensions": 0,
    "consistent-return": 0,
    "import/prefer-default-export": 0,
    "no-plusplus": 0,
    "no-continue": 0,
    quotes: [2, "double", { avoidEscape: true }],
    "no-prototype-builtins": 0,
    "react/function-component-definition": 0,
    "object-curly-newline": 0,
    "operator-linebreak": 0,
    "comma-dangle": 0,
    "no-restricted-syntax": [
      "error",
      "ForInStatement",
      "LabeledStatement",
      "WithStatement",
    ],
  },
};
