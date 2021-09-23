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
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  stories: [
    '../packages/**/*.stories.@(ts|tsx|mdx)'
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-jest',
    'storybook-addon-themes',
    '@storybook/preset-scss',
  ],
  // @ts-ignore
  webpackFinal: async (config, { configType }) => {
    config.optimization = {
      minimize: true,
      runtimeChunk: {
        name: (entrypoint) => `runtime~${entrypoint.name}`,
      },
      splitChunks: {
        chunks: 'all',
        minSize: 30 * 1024,
        maxSize: 1024 * 1024,
        maxInitialRequests: 30,
        minChunks: 1,
        maxAsyncRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        },
      }
    };
    config.devtool = configType === 'PRODUCTION' ? 'source-map' : 'eval';
    config.resolve.extensions.push('.ts', '.tsx', '.mdx');
    return config;
  }
};
