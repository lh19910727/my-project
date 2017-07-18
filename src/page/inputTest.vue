<template>
	<div class="inputtext">
		<div class="content"  v-show="show1">
			<div class="box-row">
				<div class="name">姓名</div>
				<Cinput v-model="customerName" @onInput="customerName=arguments[0].trim()" readonly='readonly' placeholder="请输入姓名"></Cinput>

			</div>
			<div class="box-row">
				<div class="name">证件类型</div>
				<Cinput v-model="certType" @onInput="certType=arguments[0].trim()" disabled="true" placeholder="请输入证件类型"></Cinput>

			</div>
			<div class="box-row">
				<div class="name">证件号码</div>
				<Cinput v-model="certCode" @onInput="certCode=arguments[0].trim()" placeholder="请输入证件号码" maxlength='18'></Cinput>

			</div>
			<div class="box-row">
				<div class="name">证件有效期</div>
				<!--<Cinput v-model="certValiDate" placeholder="请输入证件有效期"></Cinput>-->
				<group>
					<datetime ref='IDValiDate' title="" v-model='certValiDate' confirm-text="完成" cancel-text='取消' year-row='{value}年' month-row='{value}月' day-row='{value}日' :min-year="maxYear" :start-date="startDate" format="YYYY-MM-DD" placeholder="请输入证件有效期"></datetime>
				</group>

			</div>
			<div class="box-row">
				<div class="name">手机号</div>
				<Cinput v-model="telNum" @onInput="telNum=arguments[0].trim()" placeholder="请输入手机号" maxlength='11'></Cinput>

			</div>
			<div class="box-row">
				<div class="name">电子邮箱</div>
				<Cinput v-model="email" @onInput="email=arguments[0].trim()" placeholder="请输入电子邮箱"></Cinput>

			</div>
			<div class="box-row">
				<div class="name">地址</div>
				<!--<Cinput v-model="address" placeholder="请输入地址"></Cinput>-->
				<group>
					<x-address title="" :list='addressData' v-model="address" placeholder="请输入地址"></x-address>
				</group>
			</div>
			<div class="box-row">
				<div class="name">详细地址</div>
				<Cinput v-model="detailAdress" @onInput="detailAdress=arguments[0].trim()" placeholder="请输入详细地址"></Cinput>
			</div>
			<div class="box-row">
				<div class="name">邮政编码</div>
				<Cinput v-model="zipCode" :maxlength="6" @onInput="zipCode=arguments[0].trim()" placeholder="请输入邮政编码"></Cinput>

			</div>
			<div class="box-row">
				<div class="name">职业</div>
				<group>
					<popup-picker ref="applicantJob" title="" :data="list1" v-model="job" @on-change="onChange" placeholder="请输入职业"></popup-picker>
				</group>
			</div>
			<div class="bottom">
			<div class="btn" @click="post">立即投保</div>
		</div>
		</div>
		
		
		<div class="mask" v-show="show2">
			<div class="test">test</div>
			<div class="test">test</div>
			<div class="test">test</div>
			<div class="test">test</div>
			<div class="bottom">
				<div class="children1" @click='modify'>返回修改</div>
				<div class="children1" @click='confirm'>确定</div>
			</div>
			
		</div>
		<!--<popup v-model="show">
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
		</popup>-->
	</div>

</template>

<script>
	import Cinput from '@/components/Cinput.vue'
	import checkList from '../assets/js/validate'
	import { Datetime, Group, XAddress, PopupPicker, Picker, Toast, Popup } from 'vux'
	let ChinaAddressV3Data = require("../assets/js/ChinaCity.json")
	let todayDate = new Date()
	let _startDate = function() {
		let myDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate())
		return myDate.getFullYear() + "-" + (myDate.getMonth() - 0 + 1) + "-" + myDate.getDate()
	};
	let _endDate = function() {
		let myDate = new Date(todayDate.getFullYear() + 50, todayDate.getMonth(), todayDate.getDate())
		return myDate.getFullYear() + "-" + (myDate.getMonth() - 0 + 1) + "-" + myDate.getDate()
	};
	export default({
		name: 'inputTest',
		data() {
			return {
				show1:true,
				show2:false,
				message: '1',
				customerName: '张三',
				certType: '身份证',
				certCode: '412823199107271828',
				telNum: '15136170590',
				email: '374988751@qq.com',
				address: [],
				certValiDate: '',
				detailAdress: '北京市东城区东直门1号',
				zipCode: '100000',
				job: ['学生'],
				maxYear: todayDate.getFullYear(),
				startDate: _startDate(),
				value: '',
				addressData: ChinaAddressV3Data,
				title1: '手机机型',
				list1: [
					['学生', '教师', '程序员', '公务员', '司机', '其他', '不告诉你']
				],
				jobValue: ['学生'],
				dateValue: ''
			}
		},
		mounted() {
			if(!localStorage.getItem('key')){
				this.$router.push('/login2?returnUrl='+encodeURIComponent(location.href))
			}
			console.log(Array.isArray(this.addressData))
		},
		methods: {
			modify(){
				this.show2=false;
				this.show1=true;
			},
			confirm(){
				this.$router.push('/')
			},
			getDateValue() {
				//				console.log(1)
				console.log(this.value)
				return this.value
			},
			onChange(val) {
				//		      console.log('val change', val)
				this.jobValue = val[0]
			},
			onShow() {
				console.log('on show')
			},
			onHide(type) {
				console.log('on hide', type)
			},
			post() {
				console.log(this.job[0], this.certValiDate, this.certType, this.telNum, this.zipCode)
				if(!this.valdataAll()) return;
				let param = {
					job: this.job[0],
					certValiDate: this.certValiDate,
					certType: this.certType,
					telNum: this.telNum,
					zipCode: this.zipCode
				}
//				sessionStorage.setItem('data', JSON.stringify(param))
				//		    	this.$router.push({path:'/',query:param})
				this.show2 = true
				this.show1=false
			},
			showToast(options) {
				this.$vux.toast.show({
					text: options.text || '', // text: 提示文字
					position: options.position || "middle", //选择展示方式
					time: options.time || 2000, //展示时长
					type: options.type || "text",
					width: options.width || "24rem"
				});
				return false;
			},
			valdataAll() {
				//		    	this.$refs.IDValiDate.getDateValue()
				if(!checkList.isName(this.customerName)) return this.showToast({ "text": "投保人姓名格式不正确" });
				//				if(!checkList.isCardNum(this.certCode))  return this.showToast({"text":"投保人身份证格式不正确"});
				if(!checkList.isAdult(this.certCode)) return this.showToast({ "text": "投保人必须满十八周岁" });
				if(this.certValiDate == '') return this.showToast({ "text": "请选择投保人证件有效期" });
				if(!checkList.isPhone(this.telNum)) return this.showToast({ "text": "投保人手机号码不正确" });
				if(!checkList.isEmail(this.email)) return this.showToast({ "text": "投保人电子邮箱格式不正确" });
				if(this.detailAdress.length < 5 || !/[0-9]/.test(this.detailAdress)) return this.showToast({ "text": "详细地址不少于5个字符且需包含数字" });
				if(!/^[0-9]{6}$/g.test(this.zipCode)) return this.showToast({ "text": "邮政编码为六位数字" });
				if(this.address.length == 0) return this.showToast({ "text": "请选择投保人地址" });
				if(this.job[0] == null) return this.showToast({ "text": "请选择投保人职业" });
				//			    if(!this.agreement) return this.showToast({"text":"请认真阅读并同意投保协议"});
				return true
			},
		},
		components: {
			Cinput,
			Datetime,
			Group,
			XAddress,
			PopupPicker,
			Picker,
			Toast,
			Popup
		}
	})
</script>

<style lang='scss'>
	@import url("../assets/css/reset.css");
	.inputtext {
		position: relative;
		
		height: 100%;
		-webkit-overflow-scrolling: touch;
		.mask{
			position:absolute;
			left:0;
			top:0;
			width:100%;
			padding-bottom:5rem;
			/*height:100%;*/
			.test:nth-of-type(even){
				height: 20rem;
				background: yellowgreen;
			}
			.test:nth-of-type(odd){
				height: 20rem;
				background: aquamarine;
			}
			.bottom{
				position: absolute;
				bottom:0;
				left: 0;
				width: 100%;
				height:5rem;
				background: yellow;
				.children1{
					width:50%;
					height:100%;
					float:left;
					background:#fff;
					text-align:center;
					line-height:5rem
				}
				.children2{
					width:50%;
					height:100%;
					float:left;
					text-align:center;
					line-height:5rem;
				}
			}
			
		}
		.content {
			padding: 0 0 5rem 3rem;
			box-sizing: border-box;
			height: 100%;
			overflow: auto;
			overflow-x: hidden;
		}
		.box-row {
			position: relative;
			height: 5rem;
			line-height: 5rem;
			display: -webkit-box;
			border-bottom: 0.1rem solid #D4D4D8;
			&:last-child {
				border-bottom: none;
			}
			.name {
				-webkit-box-flex: 1;
				font-size: 1.5rem;
				text-align: left;
				width: 9rem;
				display: inline-block;
			}
			.vux-cell-box {
				height: 5rem;
				.weui-cell {
					line-height: 5rem;
					padding: 0;
				}
				&:before {
					border: none;
				}
				&:after {
					border: none;
				}
			}
			.weui-cells {
				margin: 0;
				height: 100%;
				border: none;
				text-align: left;
				font-size: 1.5rem;
				/*line-height: 5rem;*/
				.weui-cell__ft {
					padding-right: 3rem;
				}
				a {
					padding: 0;
					line-height: 5rem;
					color: inherit;
				}
				&:before {
					border: none;
				}
				&:after {
					border: none;
				}
			}
			.mod-cinput-box {
				-webkit-box-flex: 1;
				.mod-input {
					font-size: 1.5rem;
				}
				.input-disabled {
					text-align: left;
					line-height: 5rem;
				}
			}
		}
		.bottom {
			position: fixed;
			left: 0;
			bottom: 0;
			height: 5rem;
			width: 100%;
			border-top: 0.1rem solid #D4D4D8;
			background: #fff;
			.btn {
				float: right;
				color: #fff;
				font-size: 1.8rem;
				width: 12rem;
				background: #53a5f6;
				height: 100%;
				text-align: center;
				line-height: 5rem;
			}
		}
	}
</style>