const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = (env, options) => {
  console.log("options", options);
  return {
    entry: {
      app: path.join(__dirname, 'src', 'index.tsx')
    },
    output: {
      filename: 'index_bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
  
    module: {
      rules: [
        // TS TSX
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        // CSS, Sass
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        // images
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name]-[hash][ext]'
          }
        },
        // Fonts
        {
          test: /\.(?:ttf|otf|eot|woff|woff2)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]'
          }
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    plugins: [
      new HtmlWebpackPlugin({template: path.join(__dirname, 'public', 'index.html')}),
      new CleanWebpackPlugin(),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
      historyApiFallback: true,
      open: true,
      hot: true,
    },
  };
  
}