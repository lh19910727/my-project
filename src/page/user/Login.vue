<template>
  <div class="login">
    <h3>登录</h3>
    <div class="row">
      <label>账号</label>
  	  <input class="form-control" id="inputEmail3" placeholder="请输入账号" v-model="account">
    </div>
    <div class="row">
      <label>密码</label>
  	  <input type="password" class="form-control" id="inputPassword3" placeholder="请输入密码" v-model="password">
    </div>
  	<button type="submit" class="btn btn-default" @click="login">登录</button>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          account: '',
          password: ''
        }
      },
      methods: {
        login () {
          // 获取已有账号密码
          this.$axios.get('/api/login/getAccount')
          .then((response) => {
            // 响应成功回调
            console.log(response)
            this.existenceAccount(response.data)
          })
          .catch((reject) => {
            console.log(reject)
          })
        },
        existenceAccount (data) { //判断账号是否存在
          let flag = false;
          if(this.account && this.password) { //如果账户名已经输入
            for (let i = 0; i < data.length; i++) {
              console.log(data[i].account)
              if (data[i].account === this.account) {
                alert("此账号已存在")
                flag = true
                break;
              }
            }
            if(!flag) { //如果账号不存在，添加账号
              let params = {account: this.account, password: this.password}
              // 创建一个账号密码
              this.$axios.post('/api/login/createAccount', params)
              .then((response) => {
                console.log(response)
              })
              .catch((reject) => {
                console.log(reject)
              })
            }
          }
          else {
            if(!this.account) alert('请输入账户名')
            else alert('请输入密码')
          }
        }
      }
    }
</script>

<style lang="scss">
  @import "../../assets/css/login.scss";

</style>
