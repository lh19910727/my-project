<template>
	<div class="login">
		<div class="title">登录</div>
		<input maxlength="11" class="form-control" id="inputEmail" placeholder="请输入账号" v-model="account">
		<input maxlength="6" type="password" class="form-control" id="inputPassword" placeholder="请输入密码" v-model="password">
		<button type="submit" class="btn-default" @click="login">登录</button>
		<a href="/register" class="register">注册账号</a>
	</div>
</template>

<script>
	import { Toast } from 'vux'
	export default({
		name: 'Login',
		data() {
			return {
				account: '',
				password: '',
				returnUrl:''
			}
		},
		methods: {
			showToast(options) {
				this.$vux.toast.show({
					text: options.text || '', // text: 提示文字
					position: options.position || "middle", //选择展示方式
					time: options.time || 2000, //展示时长
					type: options.type || "text",
					width: options.width || "13rem"
				})
			},
			login() {

				if(this.account && this.password) {
					let self = this;
					self.$axios.get('/api/login/getAccount')
						.then((data) => {
							if(data.status === 200) {

								for(var i = 0; i < data.data.length; i++) {
									if(self.account != data.data[i].account) {
										self.showToast({
											text: '该账户未注册，请先注册账号',
											type: 'cancel'
										})
									} else if(self.account == data.data[i].account && self.password == data.data[i].password) {
										self.showToast({
											text: '登录成功',
											type: 'success'
										})
										localStorage.setItem('key',this.account)
										setTimeout(function(){
											
											this.returnUrl=this.$route.query.returnUrl?decodeURIComponent(this.$route.query.returnUrl):'/index'
											
											let url=this.returnUrl.split('/')[this.returnUrl.split('/').length-1]
//											console.log(returnURL)
											this.$router.replace('/'+url)
											console.log(url)
										}.bind(this),1000)
										
									}else if(self.account == data.data[i].account && self.password != data.data[i].password) {
										self.showToast({
											text: '密码不正确',
											type: 'cancel'
										})
									}  
								}

							}

							//						return self.$axios.post('/api/login/createAccount', params);

						})
				} else {
					this.showToast({
						text: '请输入正确的账号及密码',
						type: 'cancel'
					})
				}

				//					.then(function(data) {
				//
				//					})
			}
		},
		components: {
			Toast
		}
	})
</script>

<style lang="scss">
	@import url("../assets/css/reset.css");
	.title {
		margin: 0 auto 1rem;
		font-size: 1.5rem;
		text-align: center;
	}
	#inputEmail {
		display: block;
		margin: 1rem auto;
	}
	.btn-default{
		display: block;
		width: 10rem;
		height: 3.5rem;
		font-size: 1.5rem;
		text-align: center;
		margin: 2rem auto;
	}
	input {
		display: block;
		margin: 0 auto;
		width:30rem;
		height: 3rem;
		font-size: 1.5rem;
	}
	.register{
		display: block;
		margin-top:1rem;
		color: #159DFF;
		text-align: center;
	}
</style>