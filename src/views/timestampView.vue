<template>
  <h3 class="text-light text-center mb-2">更新日期</h3>
  <div class="text-light">
    <ul class="mb-4">
      <li v-for="stamp in timestamp" :key="stamp.id" class="mb-2 border border-light p-2">
        <p class="text-center mb-2 py-2 border-bottom border-light fw-bold">{{ stamp.timestamp }}</p>
        <div class="d-flex justify-content-around align-items-center">
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-success"
            @click="OpenEditTimestampModal(timestamp)">編輯</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <editTimestamp :stamp="stamp" :state="state" ref="editTimestampModal" @update="getTimestamp" />
</template>

<script>
import emitter from '@/libs/emitter.js'
import editTimestamp from '@/components/editTimestampView.vue'
export default {
  data () {
    return {
      url: process.env.VUE_APP_API,
      timestamp: [],
      stamp: {},
      state: ''
    }
  },
  components: {
    editTimestamp
  },
  methods: {
    getTimestamp () {
      const api = `${this.url}/timestamp`
      this.$http.get(api)
        .then(res => {
          this.timestamp = res.data.data
        })
        .catch(err => {
          const info = {
            icon: 'error',
            title: err.response.data.message
          }
          emitter.emit('popToast', info)
        })
    },
    OpenEditTimestampModal (timestamp) {
      this.stamp = { ...this.timestamp[0] }
      this.$refs.editTimestampModal.openModal()
    }
  },
  mounted () {
    this.getTimestamp()
  }
}
</script>
