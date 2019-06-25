// pages/mall/mall.js
import ajax from '../../utils/ajax.js'
const app = getApp()
Page({
  addToCart(e){
    let cart = wx.getStorageSync('yl-cart') ? JSON.parse(wx.getStorageSync('yl-cart')) : []
    const { id } = e.target.dataset
    const isInCart = cart.some(item => item.id === id)
    if(isInCart){
      cart = cart.map(item => {
        if(item.id === id){
          item.count += 1
        }
        return item
      })
    }else{
      cart.push({
        id,
        count:1
      })
    }
    wx.setStorageSync('yl-cart', JSON.stringify(cart))
    app.setCartBadge()
  },
  loadMore() {
    this.getList(true)
  },
  handleCateChange(e) {
    //console.log(e)
    wx.setNavigationBarTitle({
      title: e.target.dataset.title
    })
    this.setData({
      currentTab: e.target.dataset.tab,
      scrollTop: 0,
      start: 0
    },() => {
      this.getList()
    })
  },
  getList(isLoadMore = false){
    const { currentTab, start } = this.data
    ajax.get(`http://www.xiongmaoyouxuan.com/api/tab/${currentTab}?start=${start}`)
      .then(resp => {
         if(resp.data.code === 200 ){
           const list = isLoadMore ? this.data.list.concat(resp.data.data.items.list) : resp.data.data.items.list
           this.setData({
             list,
             isend: resp.data.data.items.isEnd,
             start: resp.data.data.items.nextIndex
           })
         }
      })
  },
  /**
   * 页面的初始数据
   */
  data: {
    menus: [],
    currentTab:null,
    list: [],
    isEnd: false,
    start: 0,
    scrollTop: 0
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
    ajax.get('http://www.xiongmaoyouxuan.com/api/tabs?sa=')
      .then(resp => {
        if(resp.data.code === 200){
          wx.setNavigationBarTitle({
            title: resp.data.data.list[0].name
          })
          this.setData({
            menus: resp.data.data.list,
            currentTab: resp.data.data.list[0].id
          },() => {
            this.getList()
          }) 
        }
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.setCartBadge()
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