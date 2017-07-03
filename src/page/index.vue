<template>
<div class="my-index">
	<div class="content">
		<a class="enter" href="/inputTest">进入input</a>
		<a class="enter" href="/index">进入baseinfo</a>
		<a class="enter" href="/userInfo">进入userInfo</a>
		<a class="enter" href="/login">进入login</a>
		<a class="enter" href="/upload">进入upload</a>
	</div>
	
</div>
</template>

<script>
	export default({
		name:'index',
		data(){
			return{
				
			}
		}
	})
</script>

<style lang='scss'>
.my-index{
	.content{
		width:700px;
		margin:50px auto;
		.enter{
			width: 100px;
			height: 100px;
			border-radius: 50%;
			display: inline-block;
			margin-left:30px;
			color: #fff;
			font-size: 14px;
			line-height: 100px;
			text-align: center;
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
		}
	}
}
</style>