const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  addons: [
    // {
    //   name: '@storybook/preset-typescript',
    //   include: [path.resolve(__dirname, '../src')]
    // }
  ],
  stories: ['../src/components/**/*.stories.tsx'],
  webpackFinal: async (config, { configType }) => {
    // console.dir(config, { depth: null }) || config;
    config.module.rules.push({
      test: /\.tsx?$/,
      include: path.resolve(__dirname, '../src'),
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true
          }
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
          options: {
            tsconfigPath: path.resolve(__dirname, '../tsconfig.json')
          }
        }
      ]
    });

    config.plugins.push(new ForkTsCheckerWebpackPlugin({
      eslint: true
    }));

    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  }
}