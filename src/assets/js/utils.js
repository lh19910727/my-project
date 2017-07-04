import axios from 'axios'

export default {
    isWechat: navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1 && typeof WeixinJSBridge != "undefined",
    queryParam(param){
        if(window.location.search){
            let params = window.location.search.split('?')[1].split('#')[0].split('&'),
                length = params.length

            for(let i = 0; i < length; i++){
                let temp = params[i].split('=')
                if(temp[0] === param){
                    return temp[1]
                }
            }
        }

        return false
    },
    getWechatAuthor(router, callback, loading){
        if (!this.isWechat) {
            router.replace("/login?returnUrl=" + encodeURIComponent(location.href))
            if(loading){
                loading.hide()
            }
            return
        }
        let code = this.queryParam("code")
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
                        if (loading){
                            loading.hide()
                        }
                        router.replace("/login?type=true&repeat=true&returnUrl=" + encodeURIComponent(location.href))
                        break
                    case 117://已绑定
                        localStorage.setItem("hqLoginCookieKey", data.data.accessKey)
                        break
                    default:
                        break
                }
                setTimeout(() => {
                    if (callback && typeof callback == "function"){
                        callback(data)
                    }
                }, 400)
            }).catch(error => {
                if (loading){
                    loading.hide()
                    alert("获取微信用户信息失败")
                }
            })
        }
    },
    isLogin(router, callback, flag, loading){//flag为true不需要强制登录
        let hqLoginCookieKey = localStorage.getItem("hqLoginCookieKey")
        if(hqLoginCookieKey){
            axios({
                url: requestLink("/user/isLogin"),
                headers: {'X-Requested-With': hqLoginCookieKey}
            }).then(data => {
                data = data.data;
                if (data.code == 200 && data.success || flag) {//已登陆或者不需要强制登录
                    if (callback && typeof callback == "function"){
                        callback(data)
                    }
                } else { //未登录
                    this.getWechatAuthor(router, callback, loading)
                }
            }).catch(error => {
                if (loading) {
                    loading.hide()
                    alert("登录请求失败")
                }
            })
        }else if(flag && callback && typeof callback == "function"){
            callback()
        }else{
            this.getWechatAuthor(router, callback, loading)
        }
    },
    wechatShare(wx, shareParams){
        axios({
            url: requestRootLink("getWeixinSign") + "url=" + encodeURIComponent(location.href)
        })
        .then(data => {
            if (data.status == 200) {
                data = data.data
                if(!shareParams){
                    shareParams = {
                        title: "横琴人寿",
                        imgUrl: "http://" + location.hostname + "/static/image/hengqinShareIcon.png",
                        desc: "简约 · 开放 · 专注"
                    }
                }
                wx.config({
                    appId: data.appid,
                    timestamp: data.timestamp,
                    nonceStr: data.nonce,
                    signature: data.signature,
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                })
                wx.ready(() => {
                    wx.onMenuShareTimeline({//朋友圈
                        title: shareParams.title,
                        link: data.url,
                        imgUrl: shareParams.imgUrl,
                        desc: shareParams.desc,// 分享描述
                        success: function () {
                        },
                        cancel: function () {
                        }
                    })
                    wx.onMenuShareAppMessage({//微信好友
                        title: shareParams.title,
                        link: data.url,
                        imgUrl: shareParams.imgUrl,
                        desc: shareParams.desc, // 分享描述
                        success: function () {
                        },
                        cancel: function () {
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
        if (this.isWechat){
            alert("请在微信环境中使用")
            return
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
                callback &&callback(res)
               /*if(res.err_msg == "get_brand_wcpay_request:ok" ) {

               }    */
           }
       );
    },
    /*文件上传
        options {
            url : string,
            data :{
                upfile:blob
            }, 
            error:function,
            success :function,
            complete: function
        }
    */ 
    fileUpload(options) { 

        var xhr = new XMLHttpRequest(),
            fd = new FormData(),
            sync = !options.sync ||  !false ,
            params = options.data;

            xhr.responseType = "text" || options.contentType 

            for(var i in params ){
                fd.append( i ,params[i]);
            }

            xhr.open( options.type || "post", options.url ,sync);
            var  headers = options.headers || {};
            for(var i in headers ){
                 xhr.setRequestHeader(i, headers[i]);
            }
           
            //请求成功完成 readyState = 4  
            xhr.onload = function(e){
                if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                    var data = xhr.responseText;
                    if(typeof data =="string"){
                        data = JSON.parse(data);
                    }
                    options.success&&options.success(data);
                }else{
                    options.error&&options.error(xhr);
                }
               
            }
            //请求完成 无论成功和失败
            xhr.onloadend = function(e){
                options.complete&&options.complete(xhr)
            }

            //取消请求触发
            xhr.onabort = function(){
                options.error&& options.error(xhr)
            }

            //请求超时触发
            if(xhr.ontimeout){

                xhr.ontimeout = function(e) { 
                    options.ontimeout&&options.ontimeout(xhr);

                };
            }
            
            //只有发生了网络层级别的异常才会触发此事件
            xhr.onerror = function(e) { 
                options.error&&options.error(xhr);
            };


            if( xhr.timeout ){
                xhr.timeout = 8000 || options.timeout;

            }

            //发送数据
            send();
            
            
            function send(){
                try{
                    xhr.send(fd)
                }catch(e) {
                    options.error&&options.error(xhr,e)
                };
            
            }

    },
    /*   
        图片压缩
        @param image type element
        @param quality type number [0-1]值越小，所绘制出的图像越模糊
        return base64 图片的base64编码  格式为 “data:image/png;base64,****”,
    */
    jpgCompress (image,quality){
        var canvas = document.createElement("canvas"),
            ctx = canvas.getContext('2d'),
            _with = 1024,
            r =   image.naturalWidth / image.naturalHeight;

            canvas.width = _with;
            canvas.height =  _with/r;
            // ctx.drawImage(image, 0, 0, w, h, 0, 0, w, h);
            ctx.drawImage(image, 0, 0, _with, _with/r );
            if(!quality || quality > 1 || quality < 0){
                quality = 0.7
        }
       /* 
            1.canvas.toDataURL 返回的默认格式就是 image/png格式，如果第一个参数type是image/ jpeg的话，第二个参数encoderOptions就可以用来设置图片的压缩质量
            2.base64 的格式为 “data:image/png;base64,****”
        */
        return canvas.toDataURL('image/jpeg', quality || 0.7);
    },
  
    /*
        @param dataurl data:text/plain;base64,YWFhYWFhYQ==
        @return blob 
    */
    dataURLtoBlob(dataurl){
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }, 
   /* 预览图片
    @param file 选择的文件
    @param el type element
    @param callback  type function
    */
    previewImg(file,el,callback){
        console.log(file)
        let readFile = new FileReader(),
            handleLoad = null ,
            image = new Image();
        if(el.nodeType==1&&el.nodeName=="IMG"){
            image = el 
        }else{
            handleLoad= function(){
                image.style.width = "100%" ;
                el.innerHTML = "" ;
                el.appendChild(image) ;
            }
        }
        readFile.onload  = function(e){
                image.src = readFile.result 
        }.bind(this)

        image.onload = function(){
           handleLoad&&handleLoad();
           callback&&callback();
        }
        readFile.readAsDataURL(file);
    },

};