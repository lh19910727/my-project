<template>
<div class="children1">
<div class="content">children1</div>
</div>
</template>

<script>
	export default({
		name:'children1',
		data(){
			return{
				isLogin:false
			}
			
		},
		methods:{
			init(){
				if(localStorage.getItem('key')){
					this.isLogin=true
				}
				if(!this.isLogin){
					this.$router.replace('/login2?returnUrl='+encodeURIComponent(location.href))
				}
			}
		},
		mounted(){
			this.init()
		}
	})
</script>

<style lang="scss">
	.children1{
		.content{
		margin:2rem 0 0 13rem;
		width: 20rem;
		height: 50rem;
		background: red;	
		}
	}
	
</style>