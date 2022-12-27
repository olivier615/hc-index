<template>
  <h3 class="text-light text-center mb-2">WeChat 連結</h3>
  <div class="text-light mt-3 border border-light px-1 py-3">
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon3">連結</span>
      <input type="text" class="form-control" v-model="wcLinkA.link" />
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
        @click="saveWcLink('A')">儲存</button>
      </div>
    </div>
  </div>
  <div class="text-light mt-3 border border-light px-1 py-3">
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon3">連結</span>
      <input type="text" class="form-control" v-model="wcLinkB.link" />
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
        @click="saveWcLink('B')">儲存</button>
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
      wcLinkA: {},
      wcLinkB: {}
    }
  },
  methods: {
    getWcLink () {
      const api = `${this.url}/wcLink`
      this.$http.get(api)
        .then(res => {
          this.wcLinkA = res.data.data[0]
          this.wcLinkB = res.data.data[1]
        })
        .catch(err => {
          const info = {
            icon: 'error',
            title: err.response.data.message
          }
          emitter.emit('popToast', info)
        })
    },
    saveWcLink (x) {
      let id = ''
      let data = {}
      if (x === 'A') {
        id = this.wcLinkA._id
        data = this.wcLinkA
      } else if (x === 'B') {
        id = this.wcLinkB._id
        data = this.wcLinkB
      }
      const api = `${this.url}/wcLink/${id}`
      this.$http.patch(api, data)
        .then(res => {
          const info = {
            icon: 'success',
            title: '更新成功'
          }
          this.getWcLink()
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
        this.wcLinkA.link = ''
      } else if (x === 'B') {
        this.wcLinkB.link = ''
      }
    }
  },
  mounted () {
    this.getWcLink()
  }
}
</script>
