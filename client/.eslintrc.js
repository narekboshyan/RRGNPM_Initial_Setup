module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["eslint-config-prettier", "eslint:recommended", "plugin:react/recommended", "prettier"],
  plugins: ["eslint-plugin-prettier", "react", "jsx-a11y", "import", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      classes: true,
      defaultParams: true,
    },
  },
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/prop-types": 0,
    "react/require-default-props": 0,
    "react/forbid-prop-types": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "import/no-unresolved": 0,
    "import/no-extraneous-dependencies": [0, { devDependencies: true }],
    "react/jsx-props-no-spreading": 0,
    "consistent-return": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "import/prefer-default-export": 0, // remove with mock data
    "no-restricted-syntax": 0, // need to remove after merging codes and discussing with this loop authors
    quotes: [2, "double", { avoidEscape: true }],
    "no-param-reassign": ["error", { props: true, ignorePropertyModificationsFor: ["draft"] }],
    "react/function-component-definition": 0,
    "object-curly-newline": 0,
    "operator-linebreak": 0,
    "comma-dangle": 0,
    "react/display-name": "off",
  },
};
