const path = require('path');
const env = process.env.NODE_ENV || 'development';
const resolve = dir => path.join(__dirname, dir);
// @see https://cli.vuejs.org/zh/config/
module.exports = {
  publicPath: './', //部署应用包时的基本url路径, /代表根目录下，
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'));
  },
  filenameHashing: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://interface.36dian.top',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    },
    compress: true
  },
};