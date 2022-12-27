<template>
  <h3 class="text-light text-center mb-2">線上客服連結</h3>
  <div class="text-light mt-3 border border-light px-1 py-3">
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon3">連結</span>
      <input type="text" class="form-control" v-model="onLinkA.link" />
    </div>
    <div class="d-flex justify-content-around align-items-center">
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-outline-danger"
        @click="clear('A')">清空</button>
      </div>
      <div class="d-flex">
        <p>顯示於平台：A</p>
      </div>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-success"
        @click="saveOnLink('A')">儲存</button>
      </div>
    </div>
  </div>
  <div class="text-light mt-3 border border-light px-1 py-3">
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon3">連結</span>
      <input type="text" class="form-control" v-model="onLinkB.link" />
    </div>
    <div class="d-flex justify-content-around align-items-center">
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-outline-danger"
        @click="clear('B')">清空</button>
      </div>
      <div class="d-flex">
        <p>顯示於平台：B</p>
      </div>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-success"
        @click="saveOnLink('B')">儲存</button>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter.js'
export default {
  data () {
    return {
      url: process.env.VUE_APP_API,
      onLinkA: {},
      onLinkB: {}
    }
  },
  methods: {
    getOnLink () {
      const api = `${this.url}/onLink`
      this.$http.get(api)
        .then(res => {
          this.onLinkA = res.data.data[0]
          this.onLinkB = res.data.data[1]
        })
        .catch(err => {
          const info = {
            icon: 'error',
            title: err.response.data.message
          }
          emitter.emit('popToast', info)
        })
    },
    saveOnLink (x) {
      let id = ''
      let data = {}
      if (x === 'A') {
        id = this.onLinkA._id
        data = this.onLinkA
      } else if (x === 'B') {
        id = this.onLinkB._id
        data = this.onLinkB
      }
      const api = `${this.url}/onLink/${id}`
      this.$http.patch(api, data)
        .then(res => {
          const info = {
            icon: 'success',
            title: '更新成功'
          }
          this.getOnLink()
          emitter.emit('popToast', info)
        })
        .catch(err => {
          const info = {
            icon: 'error',
            title: err.response.data.message
          }
          emitter.emit('popToast', info)
        })
    },
    clear (x) {
      if (x === 'A') {
        this.onLinkA.link = ''
      } else if (x === 'B') {
        this.onLinkB.link = ''
      }
    }
  },
  mounted () {
    this.getOnLink()
  }
}
</script>
