const path = require('path');

const NODE_ENV = process.env.NODE_ENV;

const IS_DEV =  NODE_ENV === 'development' ? true : false;
const IS_PROD =  NODE_ENV === 'production' ? true : false;

function setDevtool() {
  if(IS_DEV) return 'eval';
  if(IS_PROD) return false;
}

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '.jsx']
  },
  entry: path.resolve(__dirname, '../src/client/index.jsx'),
  mode:  NODE_ENV === 'development' ? 'development' : 'production',
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'client.js',
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/i,
        use: ['ts-loader'],
      }
    ],
  },
  plugins: [],
  devtool: setDevtool(),
}
