export default {
	/**
	 * @method isFunction
	 * @param  {Function} callback [description]
	 * @return {Boolean}           [description]
	 */

	
	isFunction:function(callback){
		if(Object.prototype.toString.call(callback)==="[object Function]") return true;
		else return false;
	},
	/**
	
	 * @param  18位身份证
	 * @return  object  => {birthday:"生日",gender:"性别"}
	 */
	getBirthday:function(idCard){
		if(typeof idCard =="string"&&idCard.length==18){
			var birthdayStr = idCard.substring(6, 14);
			return {
				birthday:birthdayStr.substring(0, 4) + "-" + birthdayStr.substring(4, 6) + "-" + birthdayStr.substring(6, 8),
				gender:idCard.substring(16, 17) % 2 == 1 ? 0 : 1
			}
		}else{
			console.log("该方法只接受18位身份证号码")
		}
		

	},
	/**
	 * @param  yyyy-mm-dd 
	 * @return  string  age 
	 ps 周岁计算，生日当天加一岁
	 */
	getAge(birthday){
		var returnAge;  
	    var birthdayArr=birthday.split("-");  
	    var birthYear = birthdayArr[0];  
	    var birthMonth = birthdayArr[1];  
	    var birthDay = birthdayArr[2]; 
	      
	    var d = new Date();  
	    var nowYear = d.getFullYear();  
	    var nowMonth = d.getMonth() + 1;  
	    var nowDay = d.getDate();  
	      
	    if(nowYear == birthYear){  
	        returnAge = 0;//同年 则为0岁  
	    }  
	    else{  
	        var ageDiff = nowYear - birthYear ; //年之差  
	        if(ageDiff > 0){  
	            if(nowMonth == birthMonth) {  
	                var dayDiff = nowDay - birthDay;//日之差  
	                if(dayDiff < 0)  
	                {  
	                    returnAge = ageDiff - 1;  
	                }  
	                else  
	                {  
	                    returnAge = ageDiff ;  
	                }  
	            }  
	            else  
	            {  
	                var monthDiff = nowMonth - birthMonth;//月之差  
	                if(monthDiff < 0)  
	                {  
	                    returnAge = ageDiff - 1;  
	                }  
	                else  
	                {  
	                    returnAge = ageDiff ;  
	                }  
	            }  
	        }  
	        else  
	        {  
	            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天  
	        }  
	    }  
	      
	    return returnAge;//返回周岁年龄  
	},
	/**
	 *通过身份证证判断是否成年
	 * @param  18位身份证
	 * @return  Boolean 
	 */
	isAdult:function(idCard){
		if(idCard.length=="18"){
			var myDate = new Date();
			var birthYear = idCard.substring(6,10)-0;
			var birthMonth = idCard.substring(10,12)-0;
			var birthDay = idCard.substring(12,14)-0;
			if(myDate.getFullYear()-birthYear>18) return true ;
			if(myDate.getFullYear()-birthYear<18) return false ;
			if(myDate.getFullYear()-birthYear==18){
				if(myDate.getMonth()+1>birthMonth) return true ;
				if(myDate.getMonth()+1<birthMonth) return false ;
				if(myDate.getMonth()+1==birthMonth) {
					if(myDate.getDate()>birthDay) return true ;
					if(myDate.getDate()<=birthDay) return false ;
				}
			}
		}else if(/[0-9]{4}-[0-9]{2}-[0-9]{2}|[0-9]{4}\/[0-9]{2}\/[0-9]{2}/.test(idCard)){
			var myDate = new Date();
			var birthYear = idCard.substring(0,4)-0;
			var birthMonth = idCard.substring(5,7)-0;
			var birthDay = idCard.substring(8,10)-0;
			if(myDate.getFullYear()-birthYear>18) return true ;
			if(myDate.getFullYear()-birthYear<18) return false ;
			if(myDate.getFullYear()-birthYear==18){
				if(myDate.getMonth()+1>birthMonth) return true ;
				if(myDate.getMonth()+1<birthMonth) return false ;
				if(myDate.getMonth()+1==birthMonth) {
					if(myDate.getDate()>=birthDay) return true ;
					if(myDate.getDate()<birthDay) return false ;
				}
			}
		}
		else {
			console.log("身份证号码不正确");
			return false
		}
		


	},
	/**
     * [将数字保留2位小数点]
     * @param {value,num} [value传进来的数字，num保留的位数]
     * @return  [转换过后的值]
    */
	numberToFixed:function(value,num){
		var powNum = Math.pow(10,num),
			nString = Math.round(value * powNum) / powNum,
			numString = nString.toString(),
			rs = numString.indexOf('.');

			if (rs < 0) {
                rs = numString.length;
                numString += '.';
            }
            while (numString.length <= rs + 2) {
                numString += '0';
            }
            return numString;
	},
	/**
     * [将字符串裁剪再加...]
     * @param {str,len} [str传进来的字符串，len开始裁剪的位置]
     * @return  [转换过后的重新拼接的字符串]
    */
	stringSubstr:function(str,len){
		if(str.length > len){
			str = str.substr(0,len)+"...";
		}
		return str;
	},
	/**
	 * [验证是否是正整数]
	 * @param  {[type]}  num [description]
	 * @return {Boolean}     [description]
	 */
	isPositive:function(num){
		var reg=new RegExp(/^[1-9]\d*$/);
		return reg.test(num);
	},
	/**
	 * [验证姓名：中英文，不允许同时存在中英文，姓名中可接受空格，逗号，点，中文名不少于一个汉字，英文名不少于4个英文字母]
	 * @param  {[name]}  num [description]
	 * @return {Boolean}     [description]
	 */
	isName: function(name) {
		var reg = new RegExp(/^([\u4e00-\u9fa5]{2,20}|[a-zA-Z\.\s]{4,20})$/);
		return reg.test(name);
	},
	/**
	 * [验证是否是正确身份证号码]
	 * @param  {[type]}  num [description]
	 * @return {Boolean}     [description]
	 */
	isCardNum: function(code) { 
		var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];//加权因子
	    var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];//校验码
	     if(/^\d{17}\d|x$/i.test(code)){  
	        var sum = 0, idx;  
	        for(var i = 0; i < code.length - 1; i++){  
	            // 对前17位数字与权值乘积求和  
	            sum += parseInt(code.substr(i, 1), 10) * arrExp[i];  
	        }
	        // 计算模（固定算法）
	        idx = sum % 11;
	        // 检验第18为是否与校验码相等
	        return arrValid[idx] == code.substr(17, 1).toUpperCase();
	    }else{
	        return false;
	    }
    },
	/**
	 * [isPhone 验证手机号]
	 * @param  {[string]}  phone [description]
	 * @return {Boolean}       [description]
	 */
	isPhone:function(phone){
		var reg=new RegExp(/^1[3|5|7|8]\d{9}$/);
		return reg.test(phone);
	},
	/**
	 * [isNum 是否是数字]
	 * @param  {[number]}  val:验证的值
	 * @return {Boolean}
	 */
	isNum:function(val){
		var reg=new RegExp(/^[0-9]*.$/);
		return reg.test(val);
	},
	/**
	 * [isNum 是否是数字]
	 * @param  {[string]}  val:验证的值,数字和字母
	 * @return {Boolean}
	 */
	isPwd:function(pwd){
		var reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/);
		return reg.test(pwd);
	},
	/**
	 * [isEqual 两个值是否相等]
	 * @param  {[number],[string]}  val1,val2:验证的值
	 * @return {Boolean}
	 */
	isEqual:function(val1,val2){
		return val1 === val2;
	},
	/**
	 * [isChinese 是中文返回true，不是中文返回false]
	 * @param  {[string]}  val [description]
	 * @return {Boolean}     [description]
	 */
	isChinese:function(val){
		var reg=new RegExp(/^[\u4e00-\u9fa5]+$/);
		return reg.test(val);
	},
	/**
	 * [isChinesePast 如果含有中文返回true，没有中文返回false]
	 * @param  {[string]}  val [description]
	 * @return {Boolean}     [description]
	 */
	isChinesePast:function(val){
		var reg=new RegExp(/.*[\u4e00-\u9fa5]+.*$/);
		return reg.test(val);
	},
	// getCookie:function(key){
	// 	var cookieArr=document.cookie.split(';');
	// 	for(var i=0;cookieArr.length;i++){
	// 		var arr=cookieArr[i].split('=');
	// 		if(arr[0]==key) return unescape(arr[1]);
	// 		else return null;
	// 	}

	// }
    /**
     * [isNumAndLetter 如果是字母或者数字返回true，如果不是字母或者数字返回false]
     * @param  {[string]}  val [description]
     * @return {Boolean}     [description]
     */
    isNumAndLetter:function(val){
        var reg=new RegExp(/^[A-Za-z0-9]+$/);
        return reg.test(val);
    },
    /**
     * [isChineseAndOtherNum 返回长度，汉字占2个字符，非汉字占1个字符]
     * @param  {[string]}  val [description]
     * @return {Number}        [description]
     */
	isChineseAndOtherNum:function(val){
		var sum = 0; 
	for (var i=0; i<val.length; i++){ 
	    var c = val.charCodeAt(i); 
	    if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){ 
	    	sum++; 
	    }else{     
	    	sum+=2; 
	    } 
	}
	return sum;
	},
    /**
   	[isEmpty 检查是否为空]
    @params {[number | string]} val
    @return Booleans(true or false)
    **/
    isEmpty: function(val){
    	if(val.trim().length <= 0) {
    		return true;
    	}
    	return false;
        // if($.trim(val).length <=0 ) {
        //     return true;
        // }
        // return false;
    },
    /**
   	[isMaxLength 检查字符串长度是否超过最大长度]
    @params {[number]} val:检测的值  maxLength: 限定的最大长度
    @return Booleans
    **/
    // isMaxLength: function(val, maxLength) {
    //     if($.trim(val).length > maxLength) {
    //         return false;
    //     }
    //     return true;
    // },
    /**
   	[isMinLength 检查字符串长度是否超过最小长度]
    @params {[number]} val:检测的值  minLength: 限定的最小长度
    @return Booleans
    **/
    // isMinLength: function(val, minLength) {
    //     if($.trim(val).length < minLength) {
    //         return false;
    //     }
    //     return true;
    // },
    /**
   	[isTel 检查电话号码是否正确]
    @params {[number]} tel:电话号码
    @return Booleans
    **/
    isTel: function(tel){
        var reg=new RegExp(/^0\d{2,3}-?\d{7,8}$/);
        if(reg.test(tel)) {
            return true;
        }
        return false;
    },
    /**
   	[isEmail 检查邮箱是否正确]
    @params {[string]} email:邮箱地址
    @return Booleans
    **/
    isEmail: function(email) {
    	var reg = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    	if(reg.test(email)) {
    		return true;
    	}
    	return false;
    },
    /**
   	[isEmail 检查银行卡号:不得少于16位且都是数字]
    @params {[string]} account:银行卡号
    @return Booleans
    **/
    isAccount: function(account) {
    	var reg = new RegExp(/^\d{16,}$/);
    	if(reg.test(account)) {
    		return true;
    	}
    	return false;
    },
    /**
   	[getQueryString 获取url参数]
    @params {[string]} name:需要获取的参数名,eg:id
    @return Booleans
    **/
    getQueryString: function(name) {
    	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if(r!=null) return unescape(r[2]); return null;
    },
    /* 格式化日期
    * @param  {[string]} [timestamp] 时间戳
    */
    /**
   	[formatDate 格式化日期]
    @params {[string]} timestamp:时间戳, type:存在时为年月日时分秒，不存在时为年月日
    @return “年－月－日 or 年－月－日－时－分－秒”
    **/
    formatDate: function(timestamp,type){
		var nowDate = new Date(timestamp),
		year = nowDate.getFullYear(),
		month = nowDate.getMonth() + 1,
		day = nowDate.getDate(),
		hour = nowDate.getHours(),
		minute = nowDate.getMinutes(),
		secound = nowDate.getSeconds(),
		date;  //返回日期
		
		if(hour < 10) hour = "0"+hour;
		if(minute < 10) minute = "0"+minute;
		if(secound < 10) secound = "0"+secound;
		
		if(type) date = year + '-' + month + '-' + day + " " + hour + ":" + minute + ":" + secound;
		else date = year + '-' + month + '-' + day;
		return date;
    },
    formatDateStr(timestamp){
    	if(timestamp){
    		let $date = new Date(timestamp),
    			year = $date.getFullYear(),
    			month = $date.getMonth() + 1,
    			date = $date.getDate()

    		return year + "年" + (month < 10 ? ('0' + month) : month) + "月" + (date < 10 ? ('0' + date) : date) + "日"
    	}
    },
    formatDateNum(timestamp){
    	if(timestamp){
    		let $date = new Date(timestamp),
    			year = $date.getFullYear(),
    			month = $date.getMonth() + 1,
    			date = $date.getDate()

    		return year + "/" + (month < 10 ? ('0' + month) : month) + "/" + (date < 10 ? ('0' + date) : date)
    	}
    }
};
