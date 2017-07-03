// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { ToastPlugin } from 'vux'
import $ from 'n-zepto';
Vue.use(ToastPlugin)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$=$
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
