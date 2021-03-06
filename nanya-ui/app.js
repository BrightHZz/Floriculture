//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    var init = this;
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that =this 

   //登录，设置’第三方session‘
   this.loginNy();

  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            that.globalData.userInfo = res.userInfo;
            // that.setData({
            //   "userInfo": res.userInfo
            // })
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          }
        })
      }
    }
  })
  },
  globalData: {
    userInfo: null
  },
  getProductList: function() {
    wx.request({
      url: 'https://www.baidu.com', // 仅为示例，并非真实的接口地址
      data: null,
      header: {},
      dataType: 'json',
      success(res) {
        console.log(res.data)
      }
    })
  },
  // 获取用户信息
  tologin : function(){
  },
  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: '18221456048' // 仅为示例，并非真实的电话号码
    })
  },
  loginNy : function(){
    wx.checkSession({
      success() {
        //session未过期
        console.log("res.data")
      },
      complete() {
        // session_key 已经失效，需要重新执行登录流程
        // 重新登录
        wx.login({
          success(res) {
            if (res.code) {
              // 发起网络请求
              wx.request({
                url: 'http://127.0.0.1:80/nanyahuayi/WxLoginController/loginUser',
                data: {
                  code: res.code
                },
                success(res) {
                  //return 3rd_session = res.data
                  wx.setStorageSync('thirdSession', res.data)
                },
                fail(res) {
                  console.log(res)
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }

    })
  }
})