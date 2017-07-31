<template>
<div class="mylist">
	<div class="btn" @click="show=true">点击</div>
	<div class="list" @scroll="scrollhandler($event)">
			<router-link @click.native="clickin" :to=url tag='li'>1</router-link>
			<router-link @click.native="clickin" :to=url tag='li'>2</router-link>
			<router-link @click.native="clickin" :to=url tag='li'>3</router-link>
			<router-link @click.native="clickin" :to=url tag='li'>4</router-link>
			<router-link @click.native="clickin" :to=url tag='li'>5</router-link>
	</div>
	<Maskcomponent :show="show" @onchange='change'></Maskcomponent>
</div>
</template>

<script>
//	import { XDialog } from 'vux'
import Maskcomponent from './mask.vue'
	export default({
		name:'list',
		data(){
			return{
				url:'/index',
				scrolltop:'',
				show:false
			}
		},
		mounted(){
			this.init()
		},
		methods:{
			change(val){
				this.show=val
			},
			init(){
				let top=this.scrolltop
//				console.log($('.mylist'))
//				$('.mylist').scrollTo(0,top)
//				$('.mylist').animate({css:{marginTop:top}})
//console.log($('.mylist'))
			},
			scrollhandler(ev){
				this.scrolltop=ev.target.scrollTop
			},
			clickin(){
				sessionStorage.setItem('scrolltop',this.scrolltop)
			},
			
		},
		components:{
				Maskcomponent
		},
		watch:{
			show(value){
				console.log('我改变了'+value)
			}
		}
	})
</script>

<style lang='scss'>
	@import url("../assets/css/reset.css");
	.mylist{
		position:relative;
		height:100%;
		-webkit-overflow-scrolling:touch;
		overflow:auto;
		.btn{
			width:20rem;
			height:20rem;
			background:blue;
		}
		.list{
			li{
				width: 100%;
				height: 30rem;
				font-size:5rem;
				color:#fff;
				&:nth-of-type(1){
					background: red;
				}
				&:nth-of-type(2){
					background: green;
				}
				&:nth-of-type(3){
					background: blue;
				}
				&:nth-of-type(4){
					background: yellow;
				}
				&:nth-of-type(5){
					background: aqua;
				}
			}
			
		}
	}
</style>