// vue.config.js
module.exports = {
  // 选项...
  publicPath: './',
  pwa: {
    name: '多人账单',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      favicon32: 'icons/256x256.png',
      favicon16: 'icons/256x256.png',
      appleTouchIcon: 'icons/256x256.png',
      maskIcon: 'icons/256x256.png',
      msTileImage: 'icons/256x256.png'
    }
  }
}