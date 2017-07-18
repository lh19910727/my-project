<template>
<div class="children2">
<div class="content">
	<div>{{children2}}</div>
	<input type="text" id="tet"  @input="changefn($event.target.value)"/>
	<input type="number" v-model.number="number" name="" id="" value="" step="20"/>
	<div>{{num}}</div>
</div>

</div>
</template>

<script>
	export default({
		name:'children2',
		data(){
			return{
				value:'change',
				children2:'children',
				num:0,
				number:1
			}
		},
		methods:{
			changefn(value){
				this.children2=value
			}
		},
		watch:{
			children2:function(newValue, oldValue){
				this.num++
//				console.log(newValue, oldValue)
				
			}
		}
	})
</script>

<style lang="scss">
	.children2{
		.content{
		margin:2rem 0 0 13rem;
		width: 20rem;
		height: 50rem;
		background: green;	
		}
	}
	
</style>