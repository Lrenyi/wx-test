// pages/shear/shear.js
Page({
  showActions() {
    // 显示操作菜单api
    wx.showActionSheet({
      itemList: ['拔号', '复制', '添加到联系人'],
      itemColor: '',
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.makeCall();
            break;
          case 1:
            this.copyPhoneNumber();
            break;
          case 2:
            this.addToContacts();
            break;
          default:
            break;
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 添加联系人
  addToContacts() {
    wx.addPhoneContact({
      nickName: '小千',
      lastName: '千锋',
      firstName: '教育',
      mobilePhoneNumber: '10000',
      success:(res) => {
        wx.showToast({
          title: '添加成功',
          icon: ''
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 获取剪切板中的内容
  pasteData() {
    wx.getClipboardData({
      success: (res) => {
        this.setData({
          clipboardData: res.data,
          isShowToolbox: true
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 将提示设置到input框中
  setDataToView() {
    this.setData({
      inputValue: this.data.clipboardData,
      isShowToolbox: false
    })
  },
  // 复制
  copyPhoneNumber() {
    // 设置剪切板内容
    wx.setClipboardData({
      data: this.data.phone,
      success: function (res) {
        wx.showToast({
          title: '复制电话成功',
          mask: true
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 拨打电话
  makeCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    phone: '10000',
    inputValue: '',
    clipboardData: '',
    isShowToolbox: false
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