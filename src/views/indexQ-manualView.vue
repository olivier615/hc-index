<template>
  <div class="container">
    <h2 class="text-light text-center my-5">生成二维码</h2>
    <div class="row justify-content-center">
      <div class="col-12 col-md-6">
        <div class="d-flex py-3 text-light">
          <p>显示于平台：</p>
          <div class="form-check ms-4">
            <input v-model="platform" class="form-check-input" value="a" type="radio" name="flexRadioDefault" id="xhc2a">
            <label class="form-check-label" for="xhc2a">
              A
            </label>
          </div>
          <div class="form-check ms-5">
            <input v-model="platform" class="form-check-input" value="b" type="radio" name="flexRadioDefault" id="xhc2b">
            <label class="form-check-label" for="xhc2b">
              B
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12 col-md-6">
        <div class="input-group mb-3">
          <input v-model="id" type="text" class="form-control" placeholder="请输入代理编号" @keyup.enter="toQRcode">
          <button class="btn btn-success" type="button" @click="toQRcode">生成二维码</button>
          <!-- <input type="button" value="生成二维码" class="btn btn-success" @click="toQRcode"> -->
        </div>
      </div>
      <div v-if="showQrCode === false" class="d-flex w-100 justify-content-center">
        <img style="height:256px; width:256px;" :src="qrCode" alt="">
      </div>
      <div v-else class="d-flex w-100 justify-content-center">
        <img style="height:256px; width:256px;" :src="dataURL" :alt="id">
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  data () {
    return {
      url: 'http://rlsdfdq.cn/hc-index/#/q?p=',
      qrCode: 'https://xhcchat.com/resource/qrcodeicon.png',
      id: '',
      platform: '',
      showQrCode: false,
      dataURL: ''
    }
  },
  methods: {
    toQRcode () {
      if (this.platform !== 'a' && this.platform !== 'b') {
        return alert('未选择平台或平台代号错误')
      }
      if (this.id.trim() === '') {
        return alert('未输入代理编号')
      }
      const clientUrl = this.url + this.platform + '&id=' + this.id
      const showId = this.id
      const options = {
        errorCorrectionLevel: 'M',
        width: 256,
        margin: 3
      }
      this.showQrCode = true
      QRCode.toCanvas(clientUrl, options, (err, canvas) => {
        if (err) throw err
        const ctx = canvas.getContext('2d')
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
  }
}
</script>
