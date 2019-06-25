// pages/shake/shake.js
Page({
  startX: 0,
  times: 0,
  startShake(){
    console.log("xxx")
    // 开始加速（开始摇晃）
    wx.startAccelerometer({
      success: (res) => {
        // 监听加速计变化
        wx.onAccelerometerChange((res) => {
          // 当次数大于2时停止加速
          if(this.times > 2){
            wx.stopAccelerometer({
              success: (res) => {
                console.log('nice')
                // 摇晃成功后停止播放音效
                this.audio.stop()
                // 播放成功后播放成功音效
                this.audio.src = 'http://fjdx.sc.chinaz.com/files/download/sound1/201410/5012.mp3'
                this.audio.play()
                // 重置变量
                this.times = 0
                this.start = 0
              },
              fail: function(res) {},
              complete: function(res) {},
            })
          }
          // 摇晃距离必须大于5
          if(Math.abs(res.x - this.startX) > 5) {
            // 每摇晃一次，次数加1
            this.time += 1
            this.startX = res.x
            // 每摇晃一次播放音效
            if(this.times === 1){
              this.audio.src = 'http://fjdx.sc.chinaz.com/files/download/sound1/201410/5018.mp3'
              this.audio.play()
            }
            console.log('success')
          }
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 页面的初始数据
   */
  data: {

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
    this.audio = wx.createInnerAudioContext()
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