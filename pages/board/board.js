// pages/board/board.js
const {
  screenWidth,
  screenHeight
} = wx.getSystemInfoSync()

Page({
  saveCanvas() {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: screenWidth,
      height: screenHeight - 50,
      canvasId: 'artboard',
      fileType: 'png',
      success: res => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: res => {
            wx.showToast({
              title: '保存成功',
            })
          }
        })
      }
    }, this)
  },
  cleanArtboard() {
    this.artboard.clearRect(0, 0, screenWidth, screenHeight)
    this.artboard.rect(0, 0, screenWidth, screenHeight - 50)
    this.artboard.setFillStyle('#FFF')
    this.artboard.fill()
    this.artboard.draw()
  },
  startDraw(e) {
    if (e.touches.length != 1) {
      return;
    }
    const {
      x,
      y
    } = e.touches[0];
    this.artboard.moveTo(x, y);
  },
  handleTouchMove(e) {
    if (e.touches.length != 1) {
      return;
    }
    const {
      x,
      y
    } = e.touches[0];
    this.artboard.lineTo(x, y);
    this.artboard.setStrokeStyle(this.data.currentColor);
    this.artboard.setLineWidth(this.data.strokeWidth);
    this.artboard.stroke();
    this.artboard.draw(true);
    this.artboard.moveTo(x, y);
  },
  changeColor(e) {
    const { color = "#F00" } = e.currentTarget.dataset;
    this.setData({
      currentColor: color
    })
  },

  changeStorkeWidth(e) {
    this.setData({
      strokeWidth: e.detail.value
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    screenWidth,
    colors: ['#F00', '#0F0', '#00F'],
    currentColor: '#F00',
    strokeWidth: 1
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
    this.artboard = wx.createCanvasContext('artboard', this)
    this.artboard.rect(0, 0, screenWidth, screenHeight - 50)
    this.artboard.setFillStyle('#FFF')
    this.artboard.fill()
    this.artboard.draw()
    this.artboard.setLineCap('round')
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