const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'; // dev or production
const isProd = !isDev;

const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`; // fix for stacked cache

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './js/main.js', // entry file
  output: {
    filename: `./js/${filename('js')}`,
    path: path.resolve(__dirname, 'dist'), // outputs
    assetModuleFilename: 'images/[hash][ext][query]',
  },

  devServer: {
    static: './dist',
    port: 3000,
    open: true,
    hot: true,
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),

    new MiniCssExtractPlugin({
      filename: `./css/${filename('css')}`,
    }),

    new SVGSpritemapPlugin('src/assets/images/svg/*.svg', {
      output: {
        filename: '../src/assets/images/spritemap.svg',
        svg: {
          sizes: true,
        },
        chunk: {
          keep: true,
        },
      },
    }),

    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/images'),
          to: path.resolve(__dirname, 'dist/assets/images'),
          globOptions: {
            ignore: ['**/svg/**'],
          },
        },
        {
          from: path.resolve(__dirname, 'src/assets/fonts'),
          to: path.resolve(__dirname, 'dist/assets/fonts'),
        },
      ],
    }),
  ],

  module: {
    // loaders settings
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },

      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
            },
          },
          'css-loader',
        ],
      },

      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.m(?:|png|jpg|gif|jpeg|svg)$i/,
        use: ['file-loader'],
      },
    ],
  },
};
