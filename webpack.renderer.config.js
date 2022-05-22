const path = require('path');
const rules = require('./webpack.rules');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const assets = ['images']; // asset directories

const devCopyPlugins = assets.map(asset => {
  return new CopyWebpackPlugin({
    patterns: [
      { 
        from: path.resolve(__dirname, 'src', asset), 
        to: path.resolve(__dirname, '.webpack/renderer', asset)
      }
    ]
  })
});

const prodCopyPlugins = assets.map(asset => {
  return new CopyWebpackPlugin({
    patterns: [
      { 
        from: path.resolve(__dirname, 'src', asset), 
        to: path.resolve(__dirname, '.webpack/renderer/main_window', asset)
      }
    ]
  })
});

rules.push({
  test: /\.css$/,
  use: [
    { loader: 'style-loader' }, 
    { loader: 'css-loader' }
  ],
});

// rules.push({
//   test: /\.(png|jpg|svg|jpeg|gif)$/i,
//   use: [
//       {
//           loader: 'file-loader',
//           options: {
//               name: '[name].[ext]',
//               publicPath: '../.', // move up from 'main_window'
//               // publicPath: 'main_window', // move up from 'main_window'
//               // context: 'src/images', // set relative working folder to src
//               outputPath: './main_window/images'
//           }
//       },
//   ],
// });

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    ...devCopyPlugins,
    ...prodCopyPlugins,
  ]
};