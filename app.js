//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    this.setCartBadge()
  },
  globalData: {
    userInfo: null
  },
  setCartBadge() {
    const cart = wx.getStorageSync('yl-cart') ? JSON.parse(wx.getStorageSync('yl-cart')) : []
    const total = cart.reduce((result,current) => {
      result += current.count
      return result
    },0)
    const totalText = total > 99 ? '99+' : total.toString()
    if(total > 0){
      wx.setTabBarBadge({
        index: 2,
        text: totalText
      })
    }
  }
})