class Ajax {
  get(url) {
    wx.showNavigationBarLoading()
    return new Promise((resolve,reject) => {
      wx.request({
        url,
        method: 'GET',
        success: function (res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        },
        complete:function (res) {
          wx.hideNavigationBarLoading()
        }
      })
    })
  }
}
export default new Ajax()