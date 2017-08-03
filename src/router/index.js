import Vue from 'vue'
import Router from 'vue-router'
import GComponents from '@/components/pubComponents.js'
import { ToastPlugin,LoadingPlugin} from 'vux'
Vue.use(Router)
Vue.use(GComponents)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
//Vue.use(XDialog)
export default new Router({
     mode: 'history',
  routes: [
  {
  	 path: '/refesh',
     component:(resolve)=>{require(['@/page/refesh','n-zepto'],resolve)}
  },
  {
  	 path: '/dbdetails',
     component:(resolve)=>{require(['@/page/dbdetails','n-zepto'],resolve)}
  },
  {
  	 path: '/dbindex',
     component:(resolve)=>{require(['@/page/dbindex','n-zepto'],resolve)}
  },
  {
      path: '/',
      component:(resolve)=>{require(['@/page/index'],resolve)},
      children:[
      {path:'/children1',component:(resolve)=>{require(['@/page/children1'],resolve)}},
      {path:'/children2',component:(resolve)=>{require(['@/page/children2'],resolve)}}
      ]
    },
    {
      path: '/index',
      component: (resolve)=>{require(['@/frame/Index'],resolve)},
      children: [
        {path: '/', component:(resolve)=>{require(['@/page/baseInfo'],resolve)}},
        {path: '/baseInfo', component: (resolve)=>{require(['@/page/baseInfo'],resolve)}},
        {path: 'workHistory', component: (resolve)=>{require(['@/page/WorkHistory'],resolve)} },
        {path: 'footer', component: (resolve)=>{require(['@/page/user/footer'],resolve)} }
      ]
    },
    {
      path: '/userInfo',
      // name: 'UserInfo',
     component:(resolve)=>{require(['@/page/UserInfo'],resolve)}
    },
    {
      path: '/workHistory',
      // name: 'WorkHistory',
      component:(resolve)=>{require(['@/page/WorkHistory'],resolve)}
    },
    {
      path: '/login',
      // name: 'Login',
      component: (resolve)=>{require(['@/page/user/Login'],resolve)}
    },
     {
      path: '/inputTest',
      // name: 'Login',
      component: (resolve)=>{require(['@/page/inputTest'],resolve)}
    },
     {
      path: '/upload',
      // name: 'Login',
      component: (resolve)=>{require(['@/page/uploadPhoto'],resolve)}
    },
    {
      path: '/login2',
      // name: 'Login',
      component:  (resolve)=>{require(['@/page/login'],resolve)}
    },
    {
      path: '/register',
      // name: 'Login',
      component:  (resolve)=>{require(['@/page/Register'],resolve)}
    },
     {
      path: '/list',
      component:  (resolve)=>{require(['@/page/list','n-zepto'],resolve)}
    }
  ]
})
