/** @type {import('prettier').Config} */
const config = {
  bracketSameLine: true,
  jsxSingleQuote: true,
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  importOrder: ['<THIRD_PARTY_MODULES>', '^@/(.*)$'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
}

export default config
