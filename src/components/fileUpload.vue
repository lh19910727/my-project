<template>
	<input class="hq-file-upload" ref="camera" type="file" accept="image/*"  @change="change">
</template>
<script>
	export default {
        name: 'HqUpload',
        props:{
            disabled:{
                required:false,
                default:false,
            }
        },  
        data () {
            return {
                file:null,
            }
        },
        mounted(){
           this.image = null;
        },
        methods:{
        	change(e){
                let self =  this,
                    readFile = new FileReader();
                if(e.target.files.length==0){
                    return 
                } 
                this.file = e.target.files[0];

                readFile.onload  = function(e){
                    
                    this.$emit("onChange",readFile.result , this.file);

                }.bind(this);

                readFile.readAsDataURL(this.file);

              
           
            },
            //对外接口换起摄像头
            getCamera(){
                if(!this.disabled){
                    this.$refs.camera.click();
                }
                
            }

        },
        watch:{

        },
        components:{
        }
    }
</script>
<style lang="scss">
.hq-file-upload{
    height: 0;
    width: 0;
    display: none;
    overflow: hidden;
}

</style>