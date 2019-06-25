// pages/photo/photo.js
Page({
  save() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.photo,
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  turnOnCamera() {
    this.setData({
      isCameraOn: true
    })
  },
  turnOffCamera() {
    this.setData({
      isCameraOn: false,
      status: false
    })
  },
  takePhoto() {
    this.camera.takePhoto({
      success: (res) => {
        console.log(res)
        this.setData({
          photo: res.tempImagePath,
          isCameraOn: false,
          status: true
        })
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    isCameraOn: false,
    status: false,
    photo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.camera = wx.createCameraContext()
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