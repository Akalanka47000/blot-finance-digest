/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['custom/react', 'plugin:@next/next/recommended'],
  rules: {
    '@next/next/no-img-element': 'off'
  }
};
