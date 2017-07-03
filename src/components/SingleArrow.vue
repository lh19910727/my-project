<template>
	<i class="mod-single-arrow" :class="option | empty"></i>
</template>

<script>
	export default {
		name: "GSingleArrow",
		props: {
	      option:{
	        
	      }
	    },
		data () {
		 	return {
		 	}
		},
		filters:{
			empty: (value) => {
				return value || '';
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	//direction: 箭头方向,默认right,其他:up, left, down
	.mod-single-arrow{
		&, &.right
		{			
			display: inline-block;
			width: .8rem;
			height: .8rem;
			border-width: .1rem .1rem 0 0;
		    border-color: #d4d4d8;
		    border-style: solid;
			-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    		transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
			position: absolute;
			top: 50%;
			right: 1.5rem;
			margin-top: -.4rem;
		}
		&.up{
			transform: rotate(-45deg) translateY(-10%);
			margin-top: 0;
		}	
		&.down{
			transform: rotate(135deg) translateY(90%);
			margin-top: 0;
		}
		&.left{
			margin-top: .1rem;
			transform: rotate(-135deg) translateY(90%);
		}	
	}
</style>
