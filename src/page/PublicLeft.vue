<template>
    <ul class="public-left">
    	<li><img src="../assets/images/user.jpg">{{ userInfo.name }}</li>
    	<li>联系方式:{{ userInfo.phone }}</li>
    	<li>邮箱:{{ userInfo.email }}</li>
    	<li><a href="">GitHub地址:{{ userInfo.github }}</a></li>
    </ul>
</template>

<script>
	export default {
  		name: 'PublicLeft',
  		props: {
			userInfo:{
				required: true,
				default:""
			}
	    },
	    data(){
	    	return {
		 		
		 	}
	    },
	    components:{
	    	
	    },
	    mounted(){
	    },
	    filters:{
	 
	    },
	    methods:{
			handleKeydown:function(event){
				this.$emit("onKeydown",event,this);	
			}	    	
	    },
	    watch:function() {
	    	
	    }
  	}
</script>
<style lang="scss">
	@import "../assets/css/publicLeft.scss";
</style>