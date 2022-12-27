<template>
  <h3 class="text-light text-center mb-2">H5 連結</h3>
  <div class="text-light mt-3 border border-light px-1 py-3">
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon3">連結</span>
      <input type="text" class="form-control" v-model="h5LinkA.link" />
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
        @click="saveH5Link('A')">儲存</button>
      </div>
    </div>
  </div>
  <div class="text-light mt-3 border border-light px-1 py-3">
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon3">連結</span>
      <input type="text" class="form-control" v-model="h5LinkB.link" />
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
        @click="saveH5Link('B')">儲存</button>
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
      h5LinkA: {},
      h5LinkB: {}
    }
  },
  methods: {
    getH5Link () {
      const api = `${this.url}/h5link`
      this.$http.get(api)
        .then(res => {
          this.h5LinkA = res.data.data[0]
          this.h5LinkB = res.data.data[1]
        })
        .catch(err => {
          const info = {
            icon: 'error',
            title: err.response.data.message
          }
          emitter.emit('popToast', info)
        })
    },
    saveH5Link (x) {
      let id = ''
      let data = {}
      if (x === 'A') {
        id = this.h5LinkA._id
        data = this.h5LinkA
      } else if (x === 'B') {
        id = this.h5LinkB._id
        data = this.h5LinkB
      }
      const api = `${this.url}/h5link/${id}`
      this.$http.patch(api, data)
        .then(res => {
          const info = {
            icon: 'success',
            title: '更新成功'
          }
          this.getH5Link()
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
        this.h5LinkA.link = ''
      } else if (x === 'B') {
        this.h5LinkB.link = ''
      }
    }
  },
  mounted () {
    this.getH5Link()
  }
}
</script>
