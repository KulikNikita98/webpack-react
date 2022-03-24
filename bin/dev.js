const webpack = require('webpack');
const [clientConfig, serverConfig] = require('../webpack.config.js');
const path = require('path');
const nodemon = require('nodemon');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');

const hmrServer = express();

const clientCompiler = webpack(clientConfig);

hmrServer.use(webpackDevMiddleware(clientCompiler, {
  headers: {
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  },
  publicPath: clientConfig.output.publicPath,
  serverSideRender: true,
  stats: 'errors-only',
  writeToDisk: true,
}))

hmrServer.use(webpackHotMiddleware(clientCompiler, {
  path: '/static/__webpack_hmr',
}))

hmrServer.listen(3001, ()=> {
  console.log('HMR Server successfully started')
})

const serverCompiler = webpack(serverConfig);

serverCompiler.run((err)=> {
  if(err) {
    console.log('Compilation failed:' + err)
  }

  serverCompiler.watch({}, (err)=> {
    if(err) {
      console.log('Compilation failed:' + err)
    }
    console.log('Compilation was succsessfully')
  })

  nodemon({
    script: path.resolve(__dirname, '../dist/server/server.js'),
    watch: [
      path.resolve(__dirname, '../dist/server'),
      path.resolve(__dirname, '../dist/client')
    ]
  })
})
