<template>
	<div v-transfer-dom>
		<x-dialog class="maskcontent" v-model="isshow" :scroll='false' hide-on-blur>
			<div class="mask"></div>
			<div class="close" @click="isshow=false">关闭</div>
		</x-dialog>
	</div>

</template>

<script>
	import { XDialog } from 'vux'
import { TransferDomDirective as TransferDom } from 'vux'
	export default({
		name:'mask',
		props:{
			show:{
				type:Boolean
			}
		},
		 directives: {
		    TransferDom
		  },
		data(){
			return{
				isshow:this.show
			}
		},
		watch:{
			show(val){
				this.isshow=val
			},
			isshow(val){
				this.$emit('onchange',val)
			}
		},
		components:{
			XDialog
		}
	})
</script>

<style lang="scss">
	/*.mask{
		position: absolute;
		top:0;
		left:0;
		width:100%;
		height:100%;
		background:rgba(0,0,0,0.5)
	}*/
		.maskcontent{
			.weui-dialog{
				.mask{
				width: 20rem;
				height:20rem;
				background:#fff;
				position: relative;
				
			}
			}
			.close{
					position: absolute;
					left: 0;
					bottom: 0;
					height:3rem;
					width:100%;
					border-top: 0.5rem solid #828282;
				}
		}
	
</style>