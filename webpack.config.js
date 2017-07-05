const path = require('path');
const SRC_DIR = path.resolve(__dirname, 'public/src');
const BUILD_DIR = path.resolve(__dirname, 'public/dist');

module.exports = {
    entry: path.resolve(SRC_DIR, 'index.jsx'),
    output: {
        path: BUILD_DIR,
        filename: "bundle.js"
    },
    module: {
      loaders: [
          { 
            test: /\.css$/,
            loader: "style!css" 
          },
          { test:/\.js|jsx$/, 
            loader: 'babel-loader',
            exclude: '/node_modules',
            query: {
              presets: ['es2015', 'react']
            } 
          }
        ]
    }
};