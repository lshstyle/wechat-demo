let ajaxTimes = 0;
export const request=(params)=>{
    let header={...params.header};
    if (params.url.includes("/my/")) {
        header["Authorization"] = wx.getStorageSync("token");
    }
    ajaxTimes++;
    wx.showLoading({
        title: "加载中",
        mask: true
    });
    const baseUrl = "http://172.20.54.41:9090";

    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success:(result)=>{
                resolve(result.data.data);
            },
            fail:(err)=>{
                reject(err);
            },
            complete:()=>{
                ajaxTimes--;
                if (ajaxTimes ===0){
                    wx.hideLoading();
                }
            }
        });
    });
}