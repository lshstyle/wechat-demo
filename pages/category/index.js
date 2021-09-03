import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContentList: [],
    currentIndex: 0,
    scrollTop: 0
  },

  categorys: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const dataStore = wx.getStorageSync('categorys');
    if (!dataStore) {
      this.getCategorys();
    } else {
      if (Date.now() - dataStore.time > 1000*10) {
        this.getCategorys();
      } else {
        this.categorys = dataStore.data;
        let leftMenuList = this.categorys.map(v=>v.name);
        let rightContentList = this.categorys[0].list;
        this.setData({leftMenuList, rightContentList});
      }
    }
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
  async getCategorys() {
    const res = await request({url:'/category/list'})
    this.categorys = res;
    wx.setStorageSync("categorys", {time: Date.now(), data: this.categorys});
    let leftMenuList = this.categorys.map(v=>v.name);
    let rightContentList = this.categorys[0].list;
    this.setData({leftMenuList, 
                  rightContentList
                });
  },
  handleItemTap(e){
    const {index} = e.currentTarget.dataset;
    let rightContentList = this.categorys[index].list;
    this.setData({currentIndex : index, 
                  rightContentList,
                  scrollTop: 0
                });
  }
})