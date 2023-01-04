<template>
  <div class="container text-light text-center">
    <div class="mt-5 mb-2">
      <h3 class="mb-3">保存二维码微信扫码进群</h3>
      <div v-show="showQrCode" class="d-flex w-100 justify-content-center">
        <img style="width: 256px; height: 256px" :src="dataURL" :alt="id">
      </div>
      <div v-if="note !== ''" class="alert alert-danger py-2" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
        {{ note }}
      </div>
      <!-- <div class="mt-2" id="capture">
        <p>如出现 <b class="text-danger bg-light">验证错误:无票码</b></p>
        <p>请点击该画面下方</p>
        <p><b class="text-dark bg-light">使用完整服务</b>，即可进入大厅</p>
        <img style="width: 256px" src="https://xhcchat.com/resource/icons/baidu2.png" alt="">
      </div> -->
    </div>
    <!-- <button type=button class="btn btn-primary" @click.prevent="htmlToCanvas">保存二维码</button> -->
    <ul class="row d-flex justify-content-between align-items-center mt-3">
      <li class="p-3 mb-2">
        <a href="https://www.baidu.com/" target="_blank">
          <div class="imgContainer">
            <img class="app-icon-l" src="https://xhcchat.com/resource/icons/baidu2.png" alt="">
          </div>
          <p class="mt-1">百度一下</p>
        </a>
      </li>
      <li class="p-3 mb-2">
        <a href="https://www.qq.com/" target="_blank">
          <div class="imgContainer">
            <img class="app-icon-l" src="https://xhcchat.com/resource/icons/qq.png" alt="">
          </div>
          <p class="mt-1">腾讯新闻</p>
        </a>
      </li>
      <li class="p-3 mb-2">
        <a href="https://weibo.com/login.php" target="_blank">
          <div class="imgContainer">
            <img class="app-icon-l" src="https://xhcchat.com/resource/icons/weibo.png" alt="">
          </div>
          <p class="mt-1">微博热搜</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import QRCode from 'qrcode'
// import html2canvas from 'html2canvas'
// import canvas2image from '@/libs/canvas2image.js'
export default {
  data () {
    return {
      url: '',
      xhc7a: 'http://f7a.znbv8az3.cloud/portal3.php?S=',
      xhc7b: 'http://f2b.ern84rghw.live/portal3.php?S=',
      platform: '',
      id: '',
      qrCode: '',
      clintUrl: '',
      note: '',
      showQrCode: false,
      dataURL: ''
    }
  },
  methods: {
    hasQuery () {
      this.url = document.location.href
      if (this.url.indexOf('?') !== -1) {
        const arr = this.url.split('?')[1].split('&')
        arr.forEach(item => {
          if (item.indexOf('id') !== -1) {
            this.id = item.split('=')[1]
          }
          if (item.indexOf('p') !== -1) {
            this.platform = item.split('=')[1]
          }
        })
        if (this.platform === 'a') {
          this.clintUrl += this.xhc7a
        }
        if (this.platform === 'b') {
          this.clintUrl += this.xhc7b
        }
        this.clintUrl += this.id
      } else {
        this.clintUrl = 'https://bd2.2win168.com/member/login'
        this.note = '请扫码后联繫线上客服'
      }
      this.toQRcode()
    },
    toQRcode () {
      const codeToRender = this.clintUrl
      const showId = this.id
      const options = {
        errorCorrectionLevel: 'M',
        width: 256,
        margin: 3
      }
      QRCode.toCanvas(codeToRender, options, (err, canvas) => {
        if (err) throw err
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        const w = canvas.width
        const h = canvas.height
        const fillColor = this.platform === 'a' ? 'maroon' : this.platform === 'b' ? 'darkblue' : ''
        ctx.beginPath()
        ctx.moveTo(w, h - 24)
        ctx.lineTo(w, h)
        ctx.lineTo(w - 24, h)
        ctx.fillStyle = fillColor
        ctx.fill()
        ctx.font = '14px/1.6 arial, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillStyle = '#000'
        ctx.fillText(showId, w / 2, h - 4)
        this.dataURL = canvas.toDataURL('image/jpeg')
      })
    }
  },
  mounted () {
    this.hasQuery()
  }
}
</script>
