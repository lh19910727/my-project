<template>
<div class="my-index">
	<div class="content">
		<router-link class="enter" to="/children1">进入children1</router-link>
		<router-link class="enter" to="/children2">进入children2</router-link>
		<router-link class="enter" to="/userInfo">进入user</router-link>
		<router-link class="enter" to="/login2">进入login</router-link>
		<router-link class="enter" to="/upload">进入upload</router-link>
		<router-link class="enter" to="/inputTest">进入input</router-link>
		<a class="enter" @click="ExitAccount" href="javascript:;">退出账号</a>
	</div>
	<router-view transition="fade-leave"></router-view>
</div>
</template>

<script>
	import { Toast } from 'vux'
	export default({
		name:'index',
		data(){
			return{
				
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
			ExitAccount(){
				if(localStorage.getItem('key')){
					localStorage.removeItem('key')
					this.showToast({text:'账号退出成功',type:'success'})
				}else{
					this.showToast({text:'您当前没有登录任何账号哦',width:'20rem',type:'cancel'})
				}
			}
		}
	})
</script>

<style lang='scss'>
	@import url("../assets/css/reset.css");
.my-index{
	position: relative;
	.content{
		width:9rem;
		/*float: left;*/
		position: absolute;
		left: 2.5rem;
		top:2.5rem;
		.enter{
			width:10rem;
			height:10rem;
			display: block;
			border-radius: 50%;
			/*display: inline-block;*/
			margin-bottom:1.5rem;
			color: #fff;
			font-size:1.3rem;
			line-height:9rem;
			text-align: center;
			font-weight: bold;
			&:nth-of-type(1){
				background: red;
			}
			&:nth-of-type(2){
				background: green;
			}
			&:nth-of-type(3){
				background: yellow;
			}
			&:nth-of-type(4){
				background: blue;
			}
			&:nth-of-type(5){
				background:aqua;
			}
			&:nth-of-type(6){
				background:pink;
			}
			&:nth-of-type(7){
				background:aqua;
			}
		}
	}
}
</style>