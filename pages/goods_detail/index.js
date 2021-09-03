import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false
  },

  goodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getGoodsDetail();
  },
  async getGoodsDetail(){
    const res = await request({url:'/goods/detail'});
    this.goodsInfo = res;
    this.setData({
      goodsObj:{
        name: res.name,
        price: res.price,
        introduce: res.introduce.replace(/\.webp/g, '.jpg'),
        list: res.list
      }
    });
  },
  handlePrevewImage(e) {
    const urls = this.goodsInfo.list.map(v=>v.imageSrc);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      urls,
      current
    });
  },
  handleCartAdd(e) {
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v.id === this.goodsInfo.id);
    if (index === -1) {
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo);
    }  else {
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    });
  },
  handleCollect() {
    let isCollect = false;
    let collect = wx.getStorageSync('collect') || [];
    let index = collect.findIndex(v => v.id === this.goodsInfo.id);
    if (index !== -1) {
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
    } else {
      collect.push(this.goodsInfo);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    wx.setStorageSync("collect", collect);
    this.setData({
      isCollect
    });
  }
})