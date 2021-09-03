import {request} from "../../request/index.js"; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图
    swiperList: [],
    categoryList: [],
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'http://172.20.54.41:9090/food/list',
    //   success: (result) => {
    //     console.log(result.data.data);
    //     this.setData({swiperList:result.data.data});
    //   }
    // });

    this.getSwiperList();
    this.getCategoryList();
    this.getFloorList();
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
    
  },

  getSwiperList() {
    request({url:'/swiper/list'})
    .then(result => {
      this.setData({swiperList:result});
    })
  },
  getCategoryList() {
    request({url:'/navigator/list'})
    .then(result => {
      this.setData({categoryList:result});
    })
  },
  getFloorList() {
    request({url:'/floor/list'})
    .then(result => {
      this.setData({floorList:result});
    })
  },
})