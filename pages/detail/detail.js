// pages/detail/detail.js
import ajax from '../../utils/ajax.js'
Page({
  addToCart(e) {
    let cart = wx.getStorageSync('yl-cart') ? JSON.parse(wx.getStorageSync('yl-cart')) : []
    const { id } = e.target.dataset
    const isInCart = cart.some(item => item.id === id)
    if (isInCart) {
      cart = cart.map(item => {
        if (item.id === id) {
          item.count += 1
        }
        return item
      })
    } else {
      cart.push({
        id,
        count: 1
      })
    }
    wx.showToast({
      title: '已加入购物车',
      icon: ''
    })
    wx.setStorageSync('yl-cart', JSON.stringify(cart))
  },
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    showOn:false,
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    details: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax.get(`http://www.xiongmaoyouxuan.com/api/detail?id=${options.id}`)
      .then(resp => {
        this.setData({
          imgUrls: resp.data.data.detail.photo,
          details: resp.data.data.detail,
          showOn: true,
        })
      })
      .catch(resp => {
        wx.showToast({
          title: '数据加载失败',
          icon: 'none',
        })
      })
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