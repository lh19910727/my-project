<template>
  <div class="data-operations">
    <div class="row">
      <label>name:</label>
      <Cinput v-model="name" @onInput="name = arguments[0]" placeholder="请输入姓名"></Cinput>
      <!-- <Cinput v-model="name" disabled @onInput="name = arguments[0]" placeholder="请输入姓名"></Cinput> -->
    </div>
    <div class="row">
      <label>phone:</label>
      <Cinput v-model="phone" type="tel" @onInput="phone = arguments[0]" placeholder="请输入手机号码"></Cinput>
    </div>
    <div class="row">
      <label>email:</label>
      <Cinput v-model="email" @onInput="email = arguments[0]" placeholder="请输入联系邮箱"></Cinput>
    </div>
    <div class="row">
      <label>github:</label>
      <Cinput v-model="github" @onInput="github = arguments[0]" placeholder="请输入github地址"></Cinput>
    </div>
    <button @click="submitUserInfo">提交</button>
  </div>
</template>

<script>
import Cinput from '../components/Input.vue'

export default {
  name: 'Index',
  data () {
    return {
      // userInfo: {'name': 'ying', 'phone': '15195601069', 'email': '2332893183@qq.com', 'github': 'www.baidu.com'},
      userInfo: [],
      name: 'ying',
      phone: '15195601069',
      email: '',
      github: ''
    }
  },
  mounted(){
    // this.ready();
  },
  components: {
    Cinput
  },
  methods: {
    submitUserInfo: function(e){
      console.log(this.phone)
      let params = {name: this.name, phone: this.phone, email: this.email, github: this.github}
      // 创建一个账号密码
      this.$axios.post('/api/user/createUserInfo', params)
      .then((response) => {
        console.log(response)
      })
      .catch((reject) => {
        console.log(reject)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  // @import "../assets/css/index.scss";
</style>
