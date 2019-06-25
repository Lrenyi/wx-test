// pages/cart/cart.js
import ajax from '../../utils/ajax.js'
const app = getApp()
Page({
  // 删除事件
  deleteList(e) {
    const id = e.currentTarget.dataset.index;
    let cartList = this.data.cartList;
    let cart = wx.getStorageSync('yl-cart') ? JSON.parse(wx.getStorageSync('yl-cart')) : []
    cart = cart.filter(item => item.id !== id)
    wx.setStorageSync('yl-cart', JSON.stringify(cart))
    app.setCartBadge()
    cartList = cartList.filter(item => item.id !== id )
    this.setData({
      cartList
    });
    if (!cartList.length){
      this.setData({
        hasList: true
      })
      wx.setTabBarBadge({
        index: 2,
        text: ''
      })
    } else {
      this.getTotalPrice();
    }
  },
  addPages(e) {
    let cart = wx.getStorageSync('yl-cart') ? JSON.parse(wx.getStorageSync('yl-cart')) : []
    const id = e.currentTarget.dataset.index;
    cart = cart.map(item => {
      if (item.id === id) {
        item.count += 1
      }
      return item
    })
    wx.setStorageSync('yl-cart', JSON.stringify(cart))
    app.setCartBadge()
  },
  minuPages(e) {
    let cart = wx.getStorageSync('yl-cart') ? JSON.parse(wx.getStorageSync('yl-cart')) : []
    const id = e.currentTarget.dataset.index;
    cart = cart.map(item => {
      if (item.id === id) {
        item.count -= 1
      }
      return item
    })
    wx.setStorageSync('yl-cart', JSON.stringify(cart))
    app.setCartBadge()
  },
  // 增加数量
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let cartList = this.data.cartList;
    cartList.map(item => {
      if(item.id === index){
        item.count += 1
        this.addPages(e)
      }
    })
    this.setData({
      cartList
    });
    this.getTotalPrice();
  },
  // 减少数量
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let cartList = this.data.cartList;
    cartList.map(item => {
      if (item.id === index && item.count > 1) {
        item.count -= 1
        this.minuPages(e)
      }
    })
    this.setData({
      cartList
    });
    this.getTotalPrice();
  },
  // 全选事件
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus
    let cartList = this.data.cartList
    selectAllStatus = !selectAllStatus
    cartList.map(item => item.isChecked = selectAllStatus)
    this.setData({
      selectAllStatus,
      cartList
    })
    // console.log(selectAllStatus,cartList)
    this.getTotalPrice()
  },
  // 选择事件
  selectList(e) {
    const index = e.currentTarget.dataset.index
    let cartList = this.data.cartList
    cartList = cartList.map(item => {
      if(item.id === index){
        item.isChecked = !item.isChecked
      }
      return item
    })
    // console.log(cartList)
    const selectAllStatus = cartList.every(item => item.isChecked === true)
    this.setData({
      cartList,
      selectAllStatus
    })
    this.getTotalPrice()
  },
  // 计算总价
  getTotalPrice() {
    let cartList = this.data.cartList;
    let total = 0;
    cartList.map(item => {
      if(item.isChecked){
        total += item.count * item.price
      }
      return item
    })
    this.setData({
      cartList,
      totalPrice:total.toFixed(2)
    })
  },
  cart: [],
  getCartList() {
    const requsets = this.cart.map(item => {
      return ajax.get(`http://www.xiongmaoyouxuan.com/api/detail?id=${item.id}`)
    })
    Promise.all(requsets)
      .then(resp => {
        const cartList = resp.map((item, index) => {
          const {
            image,
            id,
            title,
            price
          } = item.data.data.detail
          return {
            image,
            id,
            title,
            price,
            isChecked: false,
            count: this.cart[index].count
          }
        })
        this.setData({
          cartList
        })
      })
  },
  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    hasList: true,
    totalPrice: '0.00',
    selectAllStatus: false,
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
    this.cart = wx.getStorageSync('yl-cart') ? JSON.parse(wx.getStorageSync('yl-cart')) : []
    if(this.cart.length) {
      this.getCartList()
      this.setData({
        hasList: false
      })
    }
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