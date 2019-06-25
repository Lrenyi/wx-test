// pages/location/location.js
Page({
  markertap(e) {
    console.log(e)
    const {
      latitude,
      longitude
    } = this.data.markers.filter(item => item.id === e.markerId)[0]
    wx.openLocation({
      latitude,
      longitude,
      scale: '15',
      name: '千锋教育',
      address: '力宝大厦北区18楼'
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: '/icons/location.png',
      id: 10,
      latitude: 30.623632,
      longitude: 104.076424,
      width: 50,
      height: 50
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})