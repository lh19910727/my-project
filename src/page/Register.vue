<template>
	<div class="my-register">
		<div class="content">
			<h1>注册</h1>
			<div class="box-row  w-box">
				<span class="name  flex-1" >用户名:</span>
				<Cinput placeholder="请输入用户名" v-focus maxlength='11' v-model='customerName' @onInput="customerName=arguments[0].trim()"></Cinput>
			</div>
			<div class="box-row  w-box">
				<span class="name  flex-1">密码:</span>
				<Cinput placeholder="请输入密码" maxlength='6' v-model="password" @onInput="password=arguments[0].trim()"></Cinput>
			</div>
			<div class="box-row  w-box">
				<span class="name  flex-1">确认密码:</span>
				<Cinput placeholder="请确认密码" maxlength='6' v-model="rePassword" @onInput="rePassword=arguments[0].trim()"></Cinput>
			</div>
			<div class="postData" @click="postData">注册账号</div>
		</div>
	</div>

</template>

<script>
	import Cinput from '@/components/Cinput.vue'
	import { Toast } from 'vux'
	export default({
		name: 'register',
		data() {
			return {
				customerName: '',
				password: '',
				rePassword: ''
			}
		},
		methods:{
			showToast(options) {
				this.$vux.toast.show({
					text: options.text || '', // text: 提示文字
					position: options.position || "middle", //选择展示方式
					time: options.time || 2000, //展示时长
					type: options.type || "text",
					width: options.width || "13rem"
				})
			},
			postData(){
				let params={
					account:this.customerName,
					password:this.password
				}
				if(this.check()){
					this.$axios.post('/api/login/createAccount', params)
					.then((data)=>{
						this.showToast({
						text:'注册成功',
						type:'success'
					})
						setTimeout(function(){
							location.href='/login2'
						},1000)
						
					})
				}
				
			},
			check(){
				if(!this.customerName){
					console.log(this.customerName)
					this.showToast({
						text:'请输入账号'
					})
					return false
				}else if(!this.password){
					this.showToast({
						text:'请输入密码'
					})
					return false
				}else if(!this.rePassword){
					this.showToast({
						text:'请再次输入密码'
					})
					return false
				}else if(this.password!==this.rePassword){
					this.showToast({
						text:'两次输入的密码不一致'
					})
					return false
				}
				return true
			}
		},
		components: {
			Cinput,
			Toast
		}
	})
</script>

<style lang="scss">
	@import url("../assets/css/reset.css");
	.my-register {
		padding-top:8rem;
		.content{
			margin:0 auto ;
			width:21rem;
			h1{
				width: 5rem;
				font-weight:normal;
				margin: 0 auto 2rem;
			}
			.box-row{
				height:3rem;
				margin-bottom:1rem;
				.name{
					height:100%;
					line-height:3rem;
					display: inline-block;
					width:6rem;
					font-size:1.1rem;
				}
				.mod-cinput-box{
					height: 100%;
					line-height: 3rem;
					border:1px solid #333333;
					border-radius:0.3rem;
					padding-left:2rem;
					.mod-input{
						height:2rem;
						font-size:1.1rem;
						padding:0;
					}
				}
			}
			.postData{
				width:22rem;
				border-radius: 0.3rem;
				color: #fff;
				height: 3rem;
				text-align: center;
				line-height: 3rem;
				font-size: 1rem;
				background:cornflowerblue;
				margin-top: 1rem;
				cursor: pointer;
			}
		}
	}
</style>