<template>
		<div class="dbdetails">
		<h1>{{initData.title}}</h1>
		<div class="leftBox">
			<div class="raterBox">
				<rater class="rating" :font-size='25' :max='5' v-model=rater :margin="0" active-color="#ffac2d" star="★" disabled></rater>
				<em>{{initData.rating.average}}分</em>
				<span>{{initData.ratings_count}}人评价</span>
			</div>
			<p class="moveInfo">{{info}}<span @click="Showmore" v-show="islong">&nbsp;&nbsp;&nbsp;查看更多>></span></p>
		</div>

		<img :src=initData.images.large alt="image" />
	</div>
	
</template>

<script>
	import { Rater } from 'vux';
	export default({
		name: 'dbdetails',
		data() {
			return {
				id: this.$route.query.id,
				initData: {},
				url: requestLink('/v2/movie/subject/:') + this.id,
				info:'',
				islong:false
			}

		},
		mounted() {
			this.init()
		},
		computed: {
			rater() {
				if(this.initData.rating.average){
					let rating = (this.initData.rating.average) / 2
					return rating
				}
				
			}
		},
		methods: {
			Showmore(){
				this.info=this.longInfo
				this.islong=false
			},
			init() {
				this.$vux.loading.show({
					text: 'Loading'
				})
				$.ajax({
					url: 'https://api.douban.com/v2/movie/subject/' + this.id,
					dataType: 'jsonp',
					data: '',
					jsonp: 'callback',
					success: (res) =>{
						console.log(res)
						this.$vux.loading.hide({
							text: 'loading...'
						})
						this.initData = res
						this.info=this.initData.summary
						this.longInfo=this.initData.summary
						if(this.info.length>200){
							this.islong=true
							this.info=this.info.substring(0,201)+'......'
						}
					}

				})
				
				
			}
		},
		
		components: {
			Rater
		}
	})
</script>

<style lang="scss">
	@import url("../assets/css/reset.css");
	.dbdetails {
		padding:1rem 3rem 0;
		h1 {
					font-size: 2rem;
					font-weight: normal;
					height: 5rem;
					line-height: 5rem;
				}
		.leftBox {
			float: left;
			width: 65%;
			.raterBox {
				height: 3rem;
				line-height:3rem;
				.vux-rater-box {
					width:1.5rem !important;
					span{
						font-size:1.5rem;
					}
				}
				.vux-rater-outer {
					width:100% !important;
					margin-left: 0 !important;
				}
				.rating,
				em {
					float: left;
					font-size: 1rem;
					text-align: center;
					display: block;
					color: #e09015;
				}
				.rating {
					margin:0rem 1.3rem 0 -1rem;
				}
				span {
					float: left;
					margin-left: 1rem;
					font-size: 1rem;
				}
			}
			.moveInfo{
				font-size: 1rem;
				span{
					color: #159DFF;
				}
			}
		}
		img {
			float: right;
			width: 10rem;
			height: 15rem;
		}
	}
</style>