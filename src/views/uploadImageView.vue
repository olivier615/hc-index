<template>
  <h3 class="text-light text-center mb-2">上傳圖片</h3>
  <form>
    <div class="input-group mb-2">
      <label class="btn btn-outline-warning">
        <input
          ref="upload_img"
          style="display: none"
          type="file"
          @change="uploadImage"
        />
        選擇圖片上傳
        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" />
      </label>
    </div>
    <p class="text-info">圖片寬度需為 450px，高度需為 265px</p>
  </form>
  <div v-if="imgUrl" class="d-flex flex-column">
    <p class="text-light">{{ imgUrl }}</p>
    <button type="button" class="btn btn-primary mb-3 mt-3" @click="copyLink">
      <div v-if="!copied">
        <span class="fs-6">複製連結</span>
        <span class="bi bi-clipboard" />
      </div>
      <div v-else>
        <span class="me-3">已複製</span>
        <span class="bi bi-clipboard-check text-danger" />
      </div>
    </button>
    <img :src="imgUrl" alt="">
  </div>
</template>

<script>
import emitter from '@/libs/emitter.js'
export default {
  data () {
    return {
      url: process.env.VUE_APP_API,
      fileInput: null,
      imgUrl: '',
      isLoading: false,
      copied: false
    }
  },
  methods: {
    copyLink () {
      navigator.clipboard.writeText(this.imgUrl)
      this.copied = true
    },
    uploadImage () {
      this.isLoading = true
      const file = this.fileInput.files[0]
      if (!file) {
        const info = {
          icon: 'warning',
          title: '未選擇圖片檔案'
        }
        emitter.emit('popToast', info)
        this.isLoading = false
        return
      }
      if (file.type !== 'image/jpeg' && file.type !== 'image/png' &&
      file.type !== 'image/jpg') {
        const info = {
          icon: 'warning',
          title: '檔案類別僅限 jpg, jpeg 或 png'
        }
        emitter.emit('popToast', info)
        this.isLoading = false
        return
      }
      if (file.size > 2 * 1024 * 1024) {
        const info = {
          icon: 'warning',
          title: '上傳檔案須小於 2 MB'
        }
        emitter.emit('popToast', info)
        this.isLoading = false
        return
      }
      const formData = new FormData()
      formData.append('image', file)
      this.$http.post(`${this.url}/upload`, formData)
        .then(res => {
          this.imgUrl = res.data.imgUrl
          this.isLoading = false
        })
        .catch((err) => {
          const info = {
            icon: 'error',
            title: err.response.data.message
          }
          emitter.emit('popToast', info)
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.fileInput = this.$refs.upload_img
  }
}
</script>
