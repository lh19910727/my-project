<template>
	<div class="dblist">
		<h1>豆瓣电影</h1>
		<search v-model="results" :autoFixed=false @on-submit="onSubmit"></search>
		<div class="nav" @click=changeTab($event)>
			<h3 class="nav1" :class="{'active':isactive=='nav1'}">正在热映</h3>
			<a href="javascript:void(0);" class="nav2" :class="{'active':isactive=='nav2'}">全部正在热映>></a>
			<a href="javascript:void(0);" class="nav3" :class="{'active':isactive=='nav3'}">Top250>></a>
		</div>
		<scroller lock-x height="500px" :scroll-bottom-offst="5" ref="scrollerBottom" @on-scroll-bottom="onScrollBottom">
			<div>
				<ul class="movelist clearfix">
				<router-link tag="li" :to="{path:'/dbdetails',query:{id:item.id}}" v-for="(item,index) in list">
					<img :src="item.images.large" />
					<span>{{spliceTitle[index]}}</span>
					<div>
						<rater class="rating" :max='5' v-model=reater[index] :margin="0" active-color="#ffac2d" star="★"></rater>
						<em>{{item.rating.average}}分</em>
					</div>
				</router-link>
			</ul>
			<load-more :tip="tip"></load-more>
			</div>		
			
		</scroller>

	</div>
</template>

<script>
	import axios from 'axios';
	import { Rater, Search, Scroller,LoadMore  } from 'vux'
	export default({
		name: 'dbindex',
		data() {
			return {
				tip:'loading',
				search:false,
				isactive:'nav1',
				onFetching: false,
				initData: {},
				list: [],
				bottomCount:9,
				total:0,
				results: '张艺谋',
				url: requestLink('/v2/movie/in_theaters') + 'count=6'
			}
		},
		computed: {
			spliceTitle() {
				let arr = []
				this.list.forEach(function(item, index) {
					let title = item.title
					if(title.length >= 7) {
						title = item.title.substring(0, 6) + '...'
					}
					arr.push(title)

				})
				return arr
			},
			reater() {
				let arr = []
				this.list.forEach((item, index) => {
					arr.push(item.rating.average / 2)
				})
				return arr
			}
		},
		mounted() {
			
			this.$nextTick(() => {
		      this.$refs.scrollerBottom.reset({top: 0})
		    })
			if(sessionStorage.getItem('active')){
				this.isactive=sessionStorage.getItem('active')
			}else{
				this.isactive='nav1'
			}
			this.setUrl()
			this.getData()
		},
		methods: {
			setUrl(){
				switch(this.isactive){
					case 'nav1':
					this.url = requestLink('/v2/movie/in_theaters') + 'count=6'
					break;
					case 'nav2':
					this.url=requestLink('/v2/movie/in_theaters')+'count='+ this.bottomCount
					break;
					case 'nav3':
					this.url=requestLink('/v2/movie/top250')+'count='+ this.bottomCount
					default:
					break;
				}
			},
			changeTab(ev){
//				debugger
				this.search=false
				this.bottomCount=9
				let targetClass=ev.target.className.split(' ')[0]
				if(targetClass!='nav1'&&targetClass!='nav2'&&targetClass!='nav3') return
				this.isactive=targetClass
				if(this.isactive=='nav1'||this.isactive=='nav2'||this.isactive=='nav3'){
					this.setUrl()
					sessionStorage.setItem('active',this.isactive)
					this.getData()
				} 
				
				
						
			},
			onScrollBottom() {
				if(this.onFetching) {
					// do nothing
				} else {
					this.onFetching = true
					
					setTimeout(() => {
						
						this.bottomCount +=3
						if(this.bottomCount>=this.total){
							this.tip="已经最后一张啦；"
						}
						if(!this.search){
							this.setUrl()
						}
						
						this.getData()
						this.$nextTick(() => {
							this.$refs.scrollerBottom.reset()
						})
						
						this.onFetching = false
					},200)
				}
			},
			comeinDetail() {

			},
			onSubmit() {
				this.search=true
				this.bottomcount=9
				
				this.url=requestLink('/v2/movie/search') + 'q=' + this.results+'&'+this.bottomCount
//				alert(this.bottomcount)
				this.getData()
			},
			getData() {
				let self = this
				this.total=0
				this.$vux.loading.show({
					text: 'Loading'
				})
				$.ajax({
					url: self.url,
					dataType: 'jsonp',
					data: '',
					jsonp: 'callback',
					success: function(res) {
//						console.log(res)
						self.$vux.loading.hide({
							text: 'loading...'
						})
						self.initData = res
						self.list = res.subjects
						self.total=res.total
					}

				})

			}

		},
		components: {
			Rater,
			Search,
			Scroller,
			LoadMore 

		}
	})
</script>

<style lang="scss">
	@import url("../assets/css/reset.css");
	.dblist {
		height: 100%;
		overflow: auto;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
		.active{
			color:#49ca49 !important;
		}
		.vux-rater-box {
			width: 1rem !important;
		}
		.vux-rater-outer {
			width: 100% !important;
		}
		h1 {
			color: #0d81c8;
			height: 5rem;
			background: #f0f3f5;
			font-size: 2rem;
			line-height: 5rem;
			padding-left: 2rem;
		}
		.nav {
			padding-left: 2rem;
			line-height: 4rem;
			height: 4rem;
			border-bottom: 0.1rem solid #eaeaea;
			h3 {
				float: left;
				margin-right: 2rem;
				font-weight: normal;
			}
			a {
				margin-right: 2rem;
				color: #6c77bc;
				font-size: 1.3rem;
			}
		}
		.movelist {
			padding-left: 2rem;
			li {
				float: left;
				margin: 1rem 1rem 0 0;
				/*width:10rem;*/
				width: 30%;
				/*height: 18rem;*/
				img {
					width: 100%;
					height: 16rem;
				}
				span,
				em {
					font-size: 1rem;
					text-align: center;
					display: block;
				}
				div {
					height: 2rem;
					line-height: 2rem;
					em,
					.rating {
						float: left;
						/*display: inline-block;
						vertical-align: middle;*/
					}
				}
				em {
					color: #e09015;
					margin-left: 1rem;
				}
			}
		}
	}
</style>