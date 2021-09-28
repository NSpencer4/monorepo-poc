import { Configuration } from 'webpack';

const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const cwp = require('clean-webpack-plugin');

const config: Configuration = {
  mode: 'production',
  entry: './src/index.ts',
  target: 'web',
  output: {
    filename: "index.js",
    path: path.join(__dirname, "dist/"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: [["@babel/preset-env", {targets: {node: "8"}}]]
            }
          },
          "ts-loader",
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
                                     async: false,
                                   }),
    new cwp.CleanWebpackPlugin(),
  ],
};

export default config;
