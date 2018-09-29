<template>
  <div class="index-wrapper">
    <input type="text" name="username" id="username" v-model="username" placeholder="请输入用户名"/>
    <input type="password" name="password" id="password"  v-model="password" placeholder="请输入密码"/>
    <button class="submit" @click="submit">登录</button>
  </div>
</template>

<script>
import { login } from '@/assets/api/index'
export default {
  name: 'index',
  data () {
    return {
      msg: '',
      username: '',
      password: ''
    }
  },
  methods: {
    submit () {
      let serverData = {
        username: this.username,
        password: this.password
      }
      login(serverData).then(res => {
        this.$cookie.set('token', this.username)
        this.$router.push('/')
      }).catch(e => {
        console.log(e)
      })
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
