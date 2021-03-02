let path = require('path')
function resolve(url) {
  return path.resolve(__dirname, url)
}
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': resolve('src/assets'),
        'common': resolve('src/common'),
        'components': resolve('src/components'),
        'network': resolve('src/network'),
        'views': resolve('src/views'),
      }
    }
  }
}
