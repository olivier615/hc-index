<template>
  <div class="container">
    <h1 class="text-light fw-bold text-center my-5">Mini Back-End</h1>
    <form class="w-100" @submit.prevent="sign_in">
      <div class="input-group mb-3">
        <input type="text" class="border-dark border-2 form-control text-azeret" placeholder="Account"
        required autofocus v-model="user.account" aria-label="account">
      </div>
      <div class="input-group mb-5">
        <input type="password" class="border-dark border-2 form-control text-azeret" placeholder="Password"
        aria-label="password" required v-model="user.password">
      </div>
      <div class="w-100 mb-3">
        <button type="submit" class="btn btn-primary text-azeret btn-blue-dark fw-bold border-2 w-100">
          登入
          <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" />
          </button>
      </div>
    </form>
  </div>
</template>

<script>
import emitter from '@/libs/emitter.js'
export default {
  data () {
    return {
      isLoading: false,
      url: process.env.VUE_APP_API,
      user: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    sign_in () {
      this.isLoading = true
      const api = `${this.url}/user/sign_in`
      this.$http.post(api, this.user).then(res => {
        const token = res.data.user.token
        document.cookie = `hc=${token};`
        this.isLoading = false
        this.$router.push('/backEnd')
      }).catch((err) => {
        const info = {
          icon: 'error',
          title: err.response.data.message
        }
        emitter.emit('popToast', info)
        this.isLoading = false
      })
    }
  }
}
</script>
