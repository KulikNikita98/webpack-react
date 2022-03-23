const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const path = require('path');
const nodemon = require('nodemon')

const compiler = webpack(webpackConfig);

compiler.run((err)=> {
  if(err) {
    console.log('Compilation failed:' + err)
  }

  compiler.watch({}, (err)=> {
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
