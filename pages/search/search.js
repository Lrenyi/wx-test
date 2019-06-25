// pages/search/search.js
import ajax from '../../utils/ajax.js'
Page({
  sLoadMore() {
    this.getSeaList(true)
  },
  getSeaList(isLoadMore = false) {
    const { q, start } = this.data
    ajax.get(`http://www.xiongmaoyouxuan.com/api/search?word=${q}&start=${start}`)
      .then(resp => {
        console.log(resp.data.data)
        if (resp.data.code === 200) {
          if (resp.data.data.total === 0) {
            wx.showToast({
              title: "未搜索到相关商品，请更换关键字",
              icon: 'none',
            })
          } else {
            const sLists = isLoadMore ? this.data.sLists.concat(resp.data.data.list) : resp.data.data.list
            this.setData({
              sLists,
              start: resp.data.data.nextIndex,
              isEnd: resp.data.data.isEnd
            })
          }
        }
      })
      .catch(resp => {
        wx.showToast({
          title: '数据加载失败',
          icon: 'none',
        })
      })
  },
  /**
   * 页面的初始数据
   */
  data: {
    q:'',
    start: 0,
    sLists:[],
    scrollTop: 0,
    isEnd: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      q: options.q
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getSeaList()
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