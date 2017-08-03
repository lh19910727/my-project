<template>
 <scroller lock-x height="550px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
      <div class="box2">
        <p v-for="i in bottomCount">placeholder {{i}}</p>
        <load-more tip="loading"></load-more>
      </div>
    </scroller>
</template>

<script>
	import { Scroller,LoadMore } from 'vux'
	export default({
		name:'refesh',
		data(){
			return{
				onFetching:false,
				bottomCount:20,
				scrolltop:0,
				showList1: true,
			}
		},
		mounted(){
			this.$nextTick(() => {
				console.log(this.scrolltop)
		      this.$refs.scrollerBottom.reset({top:this.scrolltop+10})
		    })
		},
		methods:{
			scroll(ev){
				this.scrolltop=ev.target.scrollTop
			},
			onScrollBottom () {
//				console.log(this.scrolltop)
		      if (this.onFetching) {
		        // do nothing
		      } else {
		        this.onFetching = true
		        setTimeout(() => {
		          this.bottomCount += 10
		          this.$nextTick(() => {
		            this.$refs.scrollerBottom.reset()
		          })
		          this.onFetching = false
		        },1000)
		      }
		    }
		},
		components:{
			Scroller,LoadMore
		}
	})
</script>

<style>
</style>