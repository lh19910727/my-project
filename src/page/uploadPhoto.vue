<template>
	<div class="upload">
		<div class="content" @click="getCamer">
			<img ref="img" src="../assets/images/ico_bankcard.png"/>
		</div>
		<hq-file-upload ref="upload" @onChange="handleIdcardA"></hq-file-upload>
	</div>
</template>

<script>
	import HqFileUpload from '../components/fileUpload.vue'
	export default({
		name: 'uploadPhoto',
		data() {
			return {
			file:null
			}
		},
		mounted(){
		},
		methods: {
			getCamer(){
				this.$refs.upload.getCamera()
			},
			handleIdcardA(dataUrl,file){
				this.$refs.img.src = dataUrl
        		this.$refs.img.onload = function(){
        			let base64 = this.utils.jpgCompress(this.$refs.img,0.9)
        			//this.pre(base64)
        			this.file = this.utils.dataURLtoBlob(base64);
   
        		}.bind(this)

			}
		},
		components:{
			HqFileUpload
		}
	})
</script>

<style lang="scss">
.content{
	width: 100%;
	height: 25rem;
	img{
		height: 100%;
		width:100%;
	}
}
</style>