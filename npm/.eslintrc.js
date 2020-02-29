module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-unused-vars": "error",
    "prefer-const": "error",
    "semi": "error",
    "eqeqeq": "error",
    "space-before-blocks": "error",
    "keyword-spacing": "error",
    "space-before-function-paren": "error",
    "id-length": "error",
    "spaced-comment": "error",
    "no-tabs": "error",
    "camelcase": "error",
    "arrow-spacing": "error",
    "space-infix-ops": "error",
    "comma-spacing": "error",
    "no-mixed-spaces-and-tabs": "error",
    "curly": "error",
    "no-trailing-spaces": "error",
    "vars-on-top": "error",
    "no-magic-numbers": "error"
  }
};