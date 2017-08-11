<template>
	<div class="dblist">
		<div class="top">
			<h1>豆瓣电影</h1>
			<search v-model="results" :autoFixed=false @on-submit="onSubmit"></search>
			<div class="nav" @click=changeTab($event)>
				<h3 class="nav1" :class="{'active':isactive=='nav1'}">正在热映</h3>
				<a href="javascript:void(0);" class="nav2" :class="{'active':isactive=='nav2'}">全部正在热映>></a>
				<a href="javascript:void(0);" class="nav3" :class="{'active':isactive=='nav3'}">Top250>></a>
				<i @click="handleClick"></i>
			</div>
		</div>

		<scroller style="top:15rem" :on-refresh="refresh" :on-infinite="infinite" refresh-text="下拉刷新" noDataText="没有更多数据" :snapping="true" refreshLayerColor="#2369b6">
			<div>
				
					<swipeout class="list" v-if="direction">
						<swipeout-item  v-for="(item,index) in list">
							 <div slot="right-menu">
					          <swipeout-button @click.native="onButtonClick('fav',item)" type="primary">收藏</swipeout-button>
					          <swipeout-button @click.native="onButtonClick('delete',item)" type="warn">取消</swipeout-button>
					        </div>
							<div slot="content" class="demo-content vux-1px-t">
								<router-link  tag="div" :to="{path:'/dbdetails',query:{id:item.id}}">
								<!--<div>-->
									<img :src="item.images.large" />
									<span>{{spliceTitle[index]}}</span>
									<div>
										<rater class="rating" :max='5' :font-size="24" v-model=reater[index] :margin="12" active-color="#ffac2d" star="★"></rater>
										<em>{{item.rating.average}}分</em>
									</div>
								<!--</div>-->
								
							</router-link>
							</div>
							
						</swipeout-item>
						
					</swipeout>
					
				<ul class="movelist clearfix" v-else>
					<router-link tag="li" :to="{path:'/dbdetails',query:{id:item.id}}" v-for="(item,index) in list">
						<img :src="item.images.large" />
						<span>{{spliceTitle[index]}}</span>
						<div>
							<rater class="rating" :max='5' v-model=reater[index] :margin="0" active-color="#ffac2d" star="★"></rater>
							<em>{{item.rating.average}}分</em>
						</div>
					</router-link>
				</ul>
				
			</div>

		</scroller>
		<div class="bottom-tip">
			<span>我的信息</span>
			<router-link tag="span" to="/mycollection">我的收藏</router-link>
			<span>电影列表</span>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import { Rater, Search, Scroller, LoadMore ,Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
	export default({
		name: 'dbindex',
		data() {
			return {
				direction:false,
				tip: 'loading',
				search: false,
				isactive: 'nav1',
				onFetching: false,
				initData: {},
				list: [],
				bottomCount: 9,
				total: 0,
				results: '张艺谋',
				url: requestLink('/v2/movie/in_theaters') + 'count=6',
				total:0
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

			if(sessionStorage.getItem('active')) {
				this.isactive = sessionStorage.getItem('active')
			} else {
				this.isactive = 'nav1'
			}
			
			this.setUrl()
			if(sessionStorage.getItem('initData')){
				this.initData=sessionStorage.getItem('initData')
				this.list = this.initData.subjects
				this.total = this.initData.total
			}else{
				this.getData()
			}
			
		},
		methods: {
			onButtonClick(value,item){
				if(value=='fav'){
					console.log(item)
					sessionStorage.setItem('itemInfo',item)
					this.$vux.toast.show({text:'已收藏',type:'success'})
				}else if(value=='delete'){
				}
			},
			handleClick(){
				this.direction=this.direction?false:true;
			},
			refresh(done) {
				setTimeout(() => {
					done()
				}, 1500)
			},
			infinite(done) {
				this.bottomCount += 6
				if(this.search){
					this.url = requestLink('/v2/movie/search') + 'q=' + this.results + '&' + this.bottomCount
				}else{
					this.setUrl()
				}
				this.getData()
				if(this.bottomCount>=this.total){
					setTimeout(() => {

					done(true)
				}, 2000)
				}
				
			},
			setUrl() {
				switch(this.isactive) {
					case 'nav1':
						this.url = requestLink('/v2/movie/in_theaters') + 'count=6'
						break;
					case 'nav2':
						this.url = requestLink('/v2/movie/in_theaters') + 'count=' + this.bottomCount
						break;
					case 'nav3':
						this.url = requestLink('/v2/movie/top250') + 'count=' + this.bottomCount
					default:
						break;
				}
			},
			changeTab(ev) {
				//				debugger
				this.search = false
				this.bottomCount = 9
				let targetClass = ev.target.className.split(' ')[0]
				if(targetClass != 'nav1' && targetClass != 'nav2' && targetClass != 'nav3') return
				this.isactive = targetClass
				if(this.isactive == 'nav1' || this.isactive == 'nav2' || this.isactive == 'nav3') {
					this.setUrl()
					sessionStorage.setItem('active', this.isactive)
					this.getData()
				}

			},
			comeinDetail() {

			},
			onSubmit() {
				this.search = true
				this.bottomcount = 9
				this.url = requestLink('/v2/movie/search') + 'q=' + this.results + '&' + this.bottomCount
				//				alert(this.bottomcount)
				this.getData()
			},
			getData() {
				let self = this
				this.total = 0
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
						self.total = res.total
						sessionStorage.setItem('initData',res)
					}

				})

			}

		},
		components: {
			Rater,
			Search,
			LoadMore,
			 Swipeout, 
			 SwipeoutItem, 
			 SwipeoutButton
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
		padding-bottom: 5rem !important;
		position: relative;
		.bottom-tip{
			position:fixed;
			bottom:0;
			left:0;
			width:100%;
			height:4rem;
			background:rgba(0,0,0,1);
			span{
				font-size: 1.6rem;
				color: #fff;
				text-align: center;
				line-height:4rem;
				float: left;
				width: 33.333%;
				height: 100%;
				box-sizing: border-box;
				border-right: 0.2rem solid #fff;
			}
		}
		.top {
			z-index: 9999;
			position: fixed;
			width: 100%;
		}
		.active {
			color: #49ca49 !important;
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
			background: #fff;
			padding-left: 2rem;
			line-height: 4rem;
			height: 4rem;
			border-bottom: 0.1rem solid #eaeaea;
			i{
				float: right;
				background: url(../../dist/static/image/ico_userlist.png) no-repeat;
				width: 2rem ;
				height: 2rem;
				background-size: 2rem 2rem;
				margin:1rem 2rem 0 0;
			}
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
		.list{
			padding:0 2rem;
			.demo-content {
			  padding: 10px 10px;
			  height:10rem !important;
			}
			.demo-content div{
				height: 10rem;
				margin-bottom: 1rem;
				img{
					height: 100%;
					width: 10rem;
					float: left;
					margin-right: 2rem;
				}
				span{
					display: block;
					margin-bottom: 3rem;
				}
				div{
					height: 2rem;
					line-height: 2rem;
					em,
					.rating {
						float: left;
					}
					em {
					color: #e09015;
					margin-left:2rem;
				}
				}
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