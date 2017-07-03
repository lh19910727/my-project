<template>
	<div class="login">
		<div class="title">登录</div>
		<input maxlength="11" class="form-control" id="inputEmail" placeholder="请输入账号" v-model="account">
		<input maxlength="6" type="password" class="form-control" id="inputPassword" placeholder="请输入密码" v-model="password">
		<button type="submit" class="btn btn-default" @click="login">登录</button>
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
				password: ''
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
						.then(function(data) {
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
										setTimeout(function(){
											location.href = '/'
										},1000)
										
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
	.title {
		margin: 0 auto 1rem;
		font-size: 1rem;
	}
	
	#inputEmail {
		display: block;
		margin: 1rem auto;
	}
	
	input {
		display: block;
		margin: 0 auto;
		width: 15rem;
	}
	.register{
		display: block;
		margin-top:1rem;
		color: #159DFF;
	}
</style>