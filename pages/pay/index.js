import { getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];
    cart = cart.filter(v => v.checked);
    this.setData({address});

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.price;
      totalNum += v.num;
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },

  async handleOrderPay() {
    try {
      const token = wx.getStorageSync("token");
      if (!token) {
        wx.navigateTo({
          url: "/pages/auth/index"
        });
        return;
      }

      const price = this.data.totalPrice;
      const addr = this.data.address.all;
      const cart = this.data.cart;
      let goods = [];
      cart.forEach(v=> {
        goods.push({
          goods_id: v.id,
          goods_number: v.num,
          goods_price: v.price
        });
      });
      const orderParams = {order_price, consignee_addr, goods};
      const {order_number} = await request({url : "/my/orders/create", method: "POST", data: orderParams});
      const {pay} = await request({url : "/my/orders/req_unifiedorder", method: "POST", data: {order_number}});
      await requestPayment(pay);
      const res = await request({url: "/my/orders/chkOrder", method: "POST", data: {order_number}});
      await showToast({title: "支付成功"});
      let newCart = wx.getStorageSync("cart");
      newCart = newCart.filter(v => !v.checked);
      wx.setStorageSync("cart", newCart);
      wx.navigateTo({
        url: "/pages/order/index"
      });
    } catch (error) {
      await showToast({title: "支付失败"});
      console.log(error);
    }
  }
})
  