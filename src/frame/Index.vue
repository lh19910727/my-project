<template>
	<div class="index">
		<PublicLeft :userInfo="userInfo"></PublicLeft>
		<div class="public-right">
		    <ul class="public-menu">
		      <li class="active"><a href="#/baseInfo">基本技能</a></li>
		      <li><a href="#/workHistory">项目经验</a></li>
		      <li><a href="#">教育经历</a></li>     
		    </ul>
	    	<router-view></router-view>
	    	<div>
	    		<group title="single column">
			      <popup-picker :title="title1" :data="list1" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="测试一下"></popup-picker>
			    </group>
	    	</div>
	    </div>
	</div>
</template>

<script>
import PublicLeft from '../page/PublicLeft.vue'
import { Toast, PopupPicker, Group } from 'vux'

export default {
	name: 'Index',
	data () {
		return {
			// userInfo: {'name': 'ying', 'phone': '15195601069', 'email': '2332893183@qq.com', 'github': 'www.baidu.com'},
			userInfo: [],
		    msg: '',
		    title1: '手机机型',
		    list1: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']],
		    value1: ['iPhone']
		}
	},
	mounted(){
	    this.getUserInfo();
	},
	components: {
		PublicLeft,
		Toast,
		PopupPicker,
		Group
	},
	methods: {
	    getUserInfo: function(e){
	    	// 显示
			this.$vux.toast.show({
			 text: 'Loading'
			})
	      // 创建一个账号密码
			this.$axios.get('/api/user/getUserInfo')
			.then((res) => {
				this.userInfo = res.data[0];
			})
			.catch((reject) => {
				console.log(reject)
			})
	    },
	    onChange (val) {
	      console.log('val change', val)
	    },
	    onShow () {
	      console.log('on show')
	    },
	    onHide (type) {
	      console.log('on hide', type)
	    }
	},
	watch: {
		'$route' (to, from) {
			const toDepth = to.path.split('/').length
			const fromDepth = from.path.split('/').length
			console.log(to)
			console.log(from)
			// this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
		}
	}
}
</script>

<style lang="scss">
  @import "../assets/css/index.scss";
</style>

