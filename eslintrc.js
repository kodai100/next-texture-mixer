module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 2018,
      project: "tsconfig.json",
      sourceType: "module",
      jsx: true
    },
    plugins: ["@typescript-eslint/eslint-plugin", "react-hooks"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
      "prettier/@typescript-eslint",
      "plugin:react/recommended"
    ],
    root: true,
    env: {
      node: true,
      jest: true,
      browser: true,
      es6: true
    },
    rules: {
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "error",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/prop-types": "off",
      "react/display-name": "off"
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  };