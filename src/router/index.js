import Vue from 'vue'
import Router from 'vue-router'

//Index下的子页面
import Index from '@/frame/Index'
import baseInfo from '@/page/baseInfo'
import UserMain from '@/page/user/main'
import UserFooter from '@/page/user/footer'

import UserInfo from '@/page/UserInfo'
import WorkHistory from '@/page/WorkHistory'
import Login from '@/page/user/Login'
import inputTest from '@/page/inputTest'
import uploadPhoto from '@/page/uploadPhoto'
import index from '@/page/index'
import login from '@/page/login'
import Register from '@/page/Register'
Vue.use(Router)

export default new Router({
     mode: 'history',
  routes: [
  {
      path: '/',
      // name: 'UserInfo',
      component: index,
      chileren:[]
    },
    {
      path: '/index',
      component: Index,
      children: [
        {path: '/', component: baseInfo},
        {path: '/baseInfo', component: baseInfo},
        {path: 'workHistory', component: WorkHistory},
        {path: 'footer', component: UserFooter}
      ]
    },
    {
      path: '/userInfo',
      // name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/workHistory',
      // name: 'WorkHistory',
      component: WorkHistory
    },
    {
      path: '/login',
      // name: 'Login',
      component: Login
    },
     {
      path: '/inputTest',
      // name: 'Login',
      component: inputTest
    },
     {
      path: '/upload',
      // name: 'Login',
      component: uploadPhoto
    },
    {
      path: '/login2',
      // name: 'Login',
      component: login
    },
    {
      path: '/register',
      // name: 'Login',
      component: Register
    }
  ]
})
