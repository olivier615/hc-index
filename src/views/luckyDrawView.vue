<template>
  <h2 class="text-light text-center mb-3">抽獎名單</h2>
  <div class="px-2">
    <select class="form-select" v-model="selectOrder" @change="getOrder">
      <option selected disabled>選擇獎項</option>
      <option v-for="(item) in data" :value="item._id" :key="item._id">{{ item.order }}: {{ item.content }}</option>
    </select>
  </div>
  <div v-if="order._id !== undefined" class="px-2 my-3 text-light">
    <h5 class="text-center mb-2">{{ order.order }}: {{ order.content }}</h5>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">調整排序</span>
      <input type="number" class="form-control" v-model="order.order">
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">獎品名稱</span>
      <input type="text" class="form-control" v-model="order.content">
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">得獎人</span>
      <input type="text" class="form-control" v-model="order.winner">
    </div>
    <div class="text-center mt-3">
      <button type="button" class="btn btn-danger ms-3"
      @click="saveOrder">
        儲存
      </button>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter.js'
export default {
  data () {
    return {
      selectOrder: '選擇獎項',
      url: process.env.VUE_APP_API,
      data: {},
      order: {}
    }
  },
  methods: {
    getOrder () {
      this.data.forEach(item => {
        if (item._id === this.selectOrder) {
          this.order = item
        }
      })
    },
    getLuckyDraw () {
      this.$http.get(this.url + '/luckyDraw')
        .then(res => {
          this.data = res.data.data.sort(function (a, b) {
            return a.order - b.order
          })
        })
        .catch(err => {
          const info = {
            icon: 'error',
            title: err.response.data.message
          }
          emitter.emit('popToast', info)
        })
    },
    saveOrder () {
      const id = this.order._id
      this.$http.patch(`${this.url}/luckyDraw/${id}`, this.order)
        .then(res => {
          const info = {
            icon: 'success',
            title: '更新成功'
          }
          emitter.emit('popToast', info)
          this.getLuckyDraw()
          this.order = {}
          this.selectOrder = '選擇獎項'
        })
        .catch(err => {
          const info = {
            icon: 'error',
            title: err.response.data.message
          }
          emitter.emit('popToast', info)
        })
    }
  },
  mounted () {
    this.getLuckyDraw()
  }
}
</script>
