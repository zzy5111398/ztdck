// miniprogram/pages/addword/addword.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    description:'',
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


  saveword: function (e) {
    var form = e.detail.value;
    var that = this;
    if (!form.word){
      that.setData({
        description: [{ 'part': 'notice', 'means': '请输入单词' }]
      })
    } else if (!form.description){
      that.setData({
        description: [{ 'part': 'notice', 'means': '请输入含义' }]
      })
    }else{
      db.collection('words').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
          word: form.word,
          description: form.description
        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res),
            // that.onShow()
            wx.navigateTo({
              url: '../wordlist/wordlist',
            })
        }
      })
    }
    
  },
  change: function (e) {
    var that = this;
    console.log(e.detail.value)
    wx.request({
      url: 'https://dict-co.iciba.com/api/dictionary.php?', //金山词霸的查词接口
      data: {
        w: e.detail.value,
        key: 'DB27558F53FFDF4BC2AA556F1B87879C',  //自己申请的key
        type: 'json',
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data),
        that.setData({
          description: res.data.symbols[0].parts
        })
      }
    })
  }
})