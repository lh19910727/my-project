import axios from 'axios'

export default {
    isWechat: navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1,
    getWechatAuthor(route, callback, flag, loading){//flag:true:只判定是否登录，登录则拿用户信息；false:强制注册绑定
        if (!this.isWechat) {
            if (flag && callback && typeof callback == "function") {
                callback()
                return
            }
            window.location.href = "/login?returnUrl=" + encodeURIComponent(location.href)
            return
        }
        let code = route.query.code
        if (!code) {
            window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + encodeURIComponent(window.location.href + ((window.location.href.indexOf('?') > -1) ? '&' : '?') + 'repeat=true') + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect')
        } else {
            axios({
                url: requestLink("/user/WeChat") + "code=" + code
            }).then((data) => {
                data = data.data
                localStorage.setItem("wechatUserInfo", JSON.stringify(data.data))
                switch (data.code * 1) {
                    case 116: //未绑定用户
                        if (loading) loading.hide();
                        if (!flag) {
                            window.location.href = "/login?type=true&repeat1=true&returnUrl=" + encodeURIComponent(location.href)
                        }
                        break
                    case 117://已绑定
                        localStorage.setItem("hqLoginCookieKey", data.data.accessKey)
                        break;
                }
                setTimeout(() => {
                    if (callback && typeof callback == "function")
                        if (route.query.repeat) {
                            callback('repeat');
                        } else {
                            callback()
                        }
                }, 400)
            }).catch(error => {
                if (loading) loading.hide();
                alert("请求失败")
            })
        }
    },
    isLogin(route, callback, flag, loading, haveAuth){
        axios({
            url: requestLink("/user/isLogin"),
            headers: {'X-Requested-With': localStorage.getItem("hqLoginCookieKey")}
        }).then(data => {
            data = data.data;

            if ((data.code == 200 && data.success) || haveAuth) { //已登陆
                if (callback && typeof callback == "function") callback(data)
            } else { //未登录
                this.getWechatAuthor(route, callback, flag, loading)
            }
        }).catch(error => {
            if (loading) loading.hide()
            alert("请求失败")
        })
    },
    wechatShare(wx, shareParams){
        axios({
            url: requestRootLink("getWeixinSign") + "url=" + encodeURIComponent(location.href)
        })
        .then(data => {
            if (data.status == 200) {
                data = data.data
                wx.config({
                    appId: data.appid, // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonce, // 必填，生成签名的随机串
                    signature: data.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                })
                wx.ready(() => {
                    wx.onMenuShareTimeline({//朋友圈
                        title: shareParams.title,
                        link: shareParams.link,
                        imgUrl: shareParams.imgUrl,
                        desc: shareParams.desc, // 分享描述
                        success: function () {
                            console.log("分享朋友圈成功")
                        },
                        cancel: function () {
                            console.log("分享朋友圈取消成功")
                        }
                    })
                    wx.onMenuShareAppMessage({//微信好友
                        title: shareParams.title,
                        link: data.url,
                        imgUrl: shareParams.imgUrl,
                        desc: shareParams.desc, // 分享描述
                        success: function () {
                            console.log("分享成功")
                        },
                        cancel: function () {
                            console.log("分享取消成功")
                        }
                    })
                })
                wx.error(res => {
                    console.log(res)
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
    },
    weiXinPay(options,callback){
        if (typeof WeixinJSBridge == "undefined"){
            console.log("请在微信环境中使用");
            return ;
        }
        let params = {
                "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入     
                "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数     
                "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串     
                "package":"prepay_id=u802345jgfjsdfgsdg888",     
                "signType":"MD5",         //微信签名方式：     
                "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
           }
        if(options){
           params =  options
        }
        WeixinJSBridge.invoke(
           'getBrandWCPayRequest', 
            params,
            function(res){  
                callback &&callback(res) ; 
                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
               /*if(res.err_msg == "get_brand_wcpay_request:ok" ) {

               }    */
           }
       );
    }
};