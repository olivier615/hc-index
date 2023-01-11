<template>
  <h2 class="text-light text-center mb-3">點播歌曲</h2>
  <div class="px-2">
    <select class="form-select" v-model="selectSong">
      <option selected disabled>點播歌曲</option>
      <option v-for="(item) in songList" :value="item" :key="item._id">{{ item.order }}: {{ item.singer }} {{item.play ? '播放中' : ''}}</option>
    </select>
    <div class="text-center mt-3">
      <button type="button" class="btn btn-primary ms-3" @click="setSong('play')">
        開始撥放
      </button>
      <button type="button" class="btn btn-danger ms-3" @click="setSong('stop')">
        停止撥放
      </button>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter.js'
export default {
  data () {
    return {
      url: process.env.VUE_APP_API,
      songList: [],
      selectSong: {}
    }
  },
  methods: {
    getSong () {
      this.$http.get(`${this.url}/song`)
        .then(res => {
          const sortData = res.data.data.sort(function (a, b) {
            return a.order - b.order
          })
          this.songList = sortData
        })
    },
    setSong (setting) {
      const id = this.selectSong._id
      if (setting === 'play') {
        this.selectSong.play = true
      } else {
        this.selectSong.play = false
      }
      this.$http.patch(`${this.url}/song/${id}`, this.selectSong)
        .then(res => {
          const info = {}
          if (setting === 'paly') {
            info.icon = 'success'
            info.title = '已撥放，稍等 0-15 秒'
          } else {
            info.icon = 'success'
            info.title = '已停止，稍等 0-15 秒'
          }
          emitter.emit('popToast', info)
          this.getSong()
        })
    }
  },
  mounted () {
    this.getSong()
  }
}
</script>
