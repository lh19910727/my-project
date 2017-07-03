<template>
	<div class="mod-cinput-box">

	    <div v-if="type=='text'">
	    	<input v-if="!disabled" class="mod-input" 
		    	type="text"
		    	v-bind:value="value" 
		    	:disabled="disabled" 
		    	:name="name"
		    	:placeholder="placeholder" 
		    	:maxlength="maxlength" 
		    	:readonly="readonly" 
		    	@keydown="handleKeydown" 
		    	@focus="handleFoucs" 
		    	@blur="handleBlur" 
		    	@change="handleChange($event.target.value)"
		    	@input="handleInput($event.target.value)"/>
	    	<div class="input-disabled" v-if="disabled">{{value}}</div>
	    </div>

		<div v-if="type=='tel'">
		    <input v-if="!disabled"  class="mod-input" 
		    	v-bind:value="value" 
		    	type="tel"
		    	:name="name"
		    	:disabled="disabled" 
		    	:placeholder="placeholder" 
		    	:maxlength="maxlength" 
		    	:readonly="readonly" 
		    	@keydown="handleKeydown" 
		    	@focus="handleFoucs" 
		    	@blur="handleBlur" 
		    	@change="handleChange($event.target.value)"
		    	@input="handleInput($event.target.value)"/>
		    <div class="input-disabled" v-if="disabled">{{value}}</div>
	    </div>
	</div>
</template>

<script>
	import GSingleArrow from './SingleArrow.vue'
	export default {
  		name: 'GInput',
  		props: {
	      value:{
	        required: true,
	        default:"",

	      },
	      type:{
	      	required:false,
	      	default:"text"
	      },
	      placeholder:{
	      	required: true,
	        default:"请输入提示语",
	      },
	      readonly:{
	      	required: false
	      },
	      disabled:{
	      	required:false,
	      	default:false
	      },
	      maxlength:{
	      	required: false
	      },
	      readonly:{
	      	required:false,
	      	default:false
	      },
	      name:{
	      	required:false,
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
	    	clickHandler(){
				return this.option.clickHandler ? this.option.clickHandler() : ()=>{}
			},
			changeHandler(){
				return this.option.changeHandler ? this.option.changeHandler(this) : ()=>{}
			},
			handleFoucs(){
				this.$emit("onFoucs",this)
			},
			handleBlur(){
				this.$emit("onBlur",this)
			},
			handleInput:function(value) {
				this.$emit("onInput",value,this);
			},
			handleChange:function(value){
				this.$emit("onChange",value,this);
			},
			handleKeydown:function(event){
				this.$emit("onKeydown",event,this);	
			}
	    	
	    },
	    watch:function() {
	    	
	    }
  	}
</script>
<style lang="scss">
	.mod-cinput-box {
		box-sizing: border-box;
		position: relative;
		flex:1;
		-webkit-flex:1;
		.mod-input {
	      font-size: 1.5rem;
	      display: inline-block;
	      width: 100%;
	      border: none;
	      line-height: 2.1rem;
	    }
	    .input-disabled{
			font-size: 1.5rem;
			line-height: 2.1rem;
			color: #333;
	    }
	}
</style>