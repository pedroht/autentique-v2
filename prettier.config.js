/** @type {import('prettier').Config} */
module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  importOrder: ['<BUILTIN_MODULES>', '<THIRD_PARTY_MODULES>', '', '^types$', '^@/types/(.*)$', '^@/(.*)$', '', '^[./]'],
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
};
