import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[],
    goodsList:[]
  },

  queryParams:{
    query: "",
    parentId: "",
    pageNum: 1,
    pageSize: 10
  },
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsCategory();
    this.getGoodsList();
  },

  async getGoodsList(){
    const res = await request({url:'/goods/search', data:this.queryParams});
    const total = 19;
    this.totalPages = Math.ceil(total/this.queryParams.pageSize);
    this.setData({
      goodsList:[...this.data.goodsList, ...res]
    });
    wx.stopPullDownRefresh();

  },

  async getGoodsCategory(){
    const res = await request({url:'/goods/category'});
    this.setData({
      tabs:res
    });
  },
  handleTabsItemChange(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.active=true:v.active=false);
    this.setData({
      tabs
    });
  },
  onReachBottom(){
    if(this.queryParams.pageNum >= this.totalPages) {
      wx.showToast({title:"没有下一页数据"});
    } else {
      this.queryParams.pageNum++;
      this.getGoodsList();
    }
  },
  onPullDownRefresh(){
    this.setData({
      goodsList: []
    });
    this.queryParams.pageNum=1;
    this.getGoodsList();
  }
})