import Vue from 'vue'
import Router from 'vue-router'

//Index下的子页面
//import Index from '@/frame/Index'
//import baseInfo from '@/page/baseInfo'
//import UserMain from '@/page/user/main'
//import UserFooter from '@/page/user/footer'
//
//import UserInfo from '@/page/UserInfo'
//import WorkHistory from '@/page/WorkHistory'
//import Login from '@/page/user/Login'
//import inputTest from '@/page/inputTest'
//import uploadPhoto from '@/page/uploadPhoto'
////import index from '@/page/index'
//import login from '@/page/login'
//import Register from '@/page/Register'
Vue.use(Router)

export default new Router({
     mode: 'history',
  routes: [
  {
      path: '/',
      // name: 'UserInfo',
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
    }
  ]
})
