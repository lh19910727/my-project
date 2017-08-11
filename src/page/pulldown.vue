<template>
	<scroller :on-refresh="refresh"
     		 :on-infinite="infinite"
     		 refresh-text="下拉刷新"
     		 noDataText="没有更多数据"
     		 :snapping="true"
     		 refreshLayerColor="#2369b6">
		<div class="scroller"
			 v-for="item in list"
			 >{{item}}
		</div>
		
	</scroller>
</template>

<script>
	export default({
		name:'pulldown',
		data(){
			return{
				tip:'下拉刷新',
				list:[]
			}
		},
		mounted(){
			for(var i=0;i<20;i++){
				this.list.push(i+'i am walking')
			}
			 this.top = 1
      		this.bottom = 20
		},
		methods:{
			 refresh(done) {
		        setTimeout(() => {
		          done()
		        }, 1500)
		      },
		      infinite(done) {
		      	setTimeout(()=>{
		      		done(true)
		      	},2000)
//			        if (this.bottom >= 30) {
//			        	console.log('执行 1')
//			          setTimeout(() => {
//			            done(true)
//			          }, 1500)
//			          return;
//			        }
//			        setTimeout(() => {
//			        	
//			        	console.log('执行 2')
//			          this.bottom = this.bottom + 10;
//			          setTimeout(() => {
//			            done()
//			          })
//			        }, 1500)
		      	}
		}
	})
</script>

<style lang="scss">
	@import url("../assets/css/reset.css");
	.scroller{
		height:8rem;
		width: 100%;
		background: #eeeeee;
		font-size:1.8rem;
		&:nth-child(even){
			background: #fff;
		}
	}
</style>