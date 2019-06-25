// pages/home/home.js
import ajax from '../../utils/ajax.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  toDetail(e) {
    const { id, type } = e.currentTarget.dataset
    if(type === 1){
      wx.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      })
    }else{
      wx.navigateTo({
        url: "/pages/code/code"
      })
    }
  },
  toSearch() {
    const { q } = this.data;
    if (q) {
      wx.navigateTo({
        url: `/pages/search/search?q=${q}`,
        success: () => {
          this.setData({
            q: ''
          })
        }
      })
    } else {
      wx.showToast({
        title: '关键字不能为空',
        icon: 'none',
        mask: true
      })
    }
  },
  handleSearchInput (e) {
    this.setData({
      q: e.detail.value
    })
  },
  data: {
    currentCity:'',
    q:'',
    hasGetPosition: false,
    imgUrls: [
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2727780305,598173452&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2749317388,1444074894&fm=26&gp=0.jpg',
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1278674570,1117976406&fm=26&gp=0.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    lists:[],
    end:''
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
    ajax.get('http://www.xiongmaoyouxuan.com/api/tab/1?start=0')
      .then(resp => {       
        if(resp.data.code === 200){
          this.setData({
            lists:resp.data.data.items.list,
            end: !resp.data.data.items.isEnd ? '没有更多了' : ''
          })
        }
      })
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        const {
          latitude,
          longitude
        } = res
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=3L5BZ-7BWKR-PAWWE-WUMUA-XOHNT-JPFLH`,
          success: (res) => {
            this.setData({
              hasGetPosition: true,
              currentCity: res.data.result.address_component.city
            })
          }
        })
      },
      fail: function(res) {},
      complete: function(res) {},
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