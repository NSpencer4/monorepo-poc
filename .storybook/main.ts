// @ts-ignore
module.exports = {
  typescript: {
    shouldExtractLiteralValuesFromEnum: true,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
  stories: [
    '../packages/**/*.stories.@(ts|tsx|mdx)'
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-jest',
    'storybook-addon-themes'
  ],
};
