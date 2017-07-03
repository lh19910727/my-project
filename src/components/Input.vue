<template>
    <input class="mod-input" :type="type" v-bind:value="value" @input="handleInput($event.target.value)" />
</template>

<script>
	export default {
  		name: 'Cinput',
  		props: {
			value:{
				required: false,
				default:""
			},
			type:{
				required: false,
				default:"text"
			}
	    },
	    data(){
	    	return {
		 		
		 	}
	    },
	    components:{
	    	
	    },
	    mounted(){
	    	// console.log(this.value);
	    },
	    filters:{
	 
	    },
	    methods:{
			handleInput:function(value) {
				this.$emit("onInput",value,this);
			},	    	
	    },
	    watch:function() {
	    	console.log(this.value);
	    }
  	}
</script>
<style lang="scss">
	@import "../assets/css/input.scss";
</style>