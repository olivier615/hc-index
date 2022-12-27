<template>
  <div class="container">
    <h1 class="text-light text-center fw-bold my-4">HC-Index 小後臺</h1>
      <ul class="pb-2 mb-3">
        <router-link class="btn btn-success mx-2 my-1" to="/backEnd/banner">輪播圖</router-link>
        <router-link class="btn btn-success mx-2 my-1" to="/backEnd/notice">通知訊息</router-link>
        <router-link class="btn btn-success mx-2 my-1" to="/backEnd/h5Link">H5 連結</router-link>
        <router-link class="btn btn-success mx-2 my-1" to="/backEnd/weChatLink">微信連結</router-link>
        <router-link class="btn btn-success mx-2 my-1" to="/backEnd/onLink">線上客服</router-link>
        <router-link class="btn btn-success mx-2 my-1" to="/backEnd/service">客服帳號</router-link>
        <router-link class="btn btn-success mx-2 my-1" to="/backEnd/timestamp">更新日期</router-link>
        <router-link class="btn btn-warning mx-2 my-1" to="/backEnd/uploadImage">上傳圖片</router-link>
      </ul>
    <router-view/>
  </div>
</template>

<script>
import emitter from '@/libs/emitter.js'
export default {
  data () {
    return {
      url: process.env.VUE_APP_API,
      isLogin: false,
      token: document.cookie.replace(/(?:(?:^|.*;\s*)hc\s*\=\s*([^;]*).*$)|^.*$/, '$1'), // eslint-disable-line
    }
  },
  methods: {
    checkSignIn () {
      this.takeAuthorization()
      if (this.token) {
        this.$http.get(`${this.url}/user`)
          .then(res => {
            this.isLogin = false
          })
          .catch(err => {
            this.isLogin = false
            const info = {
              icon: 'error',
              title: err.response.data.message
            }
            emitter.emit('popToast', info)
            this.$router.push('/signIn')
          })
      }
    },
    takeAuthorization () {
      this.$http.defaults.headers.common['Authorization'] = `Bearer ${this.token}` // eslint-disable-line
    }
  },
  provide () {
    return {
      token: `Bearer ${this.token}`,
      authorization: this.takeAuthorization()
    }
  },
  mounted () {
    this.checkSignIn()
  }
}
</script>
