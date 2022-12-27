<template>
  <section>
    <h1 class="fw-bolder text-center mt-5 text-light pos-re">新皇朝永久官网
      <span class="text-secondary pos-ab fs-6" style="right: 0; top: 0;">A</span>
    </h1>
    <p class="text-light text-center mb-3">永久网址 cf11.cc</p>
    <p class="text-light text-center mb-3">最新更新日期: {{ timestamp }}</p>
    <Splide :options="options" aria-label="My Favorite Images" class="p-0">
      <SplideSlide v-for="(banner, i) in bannerList" :key="i" data-splide-interval="5000">
        <img :src="banner.url" alt="Sample 1">
      </SplideSlide>
      <div class="splide__arrows opacity-0">
        <button class="splide__arrow splide__arrow--prev">
          Prev
        </button>
        <button class="splide__arrow splide__arrow--next">
          Next
        </button>
      </div>
    </Splide>
  </section>
  <section>
    <ul class="px-2 mt-3">
      <li class="px-2" v-for="(notice, i) in noticeList" :key="i">
        <div class="alert alert-danger py-2" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
          {{ notice.note }}
        </div>
      </li>
    </ul>
  </section>
  <section>
    <h3 class="px-3 fs-5 text-center my-3 text-light mt-5">进入游戏大厅</h3>
    <div class="d-grid gap-2 col-6 mx-auto">
      <a v-if="h5Link !== ''" class="btn btn-outline-primary" type="button" :href="h5Link[0].link"
        target="_blank">永久 h5 登入页</a>
      <button v-else class="btn btn-outline-primary" type="button" disabled>
        <div class="spinner-border spinner-border-sm text-info" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </button>
    </div>
    <div class="d-grid gap-2 col-6 mx-auto mt-3">
      <button v-if="wcLink !== ''" class="btn btn-outline-success" type="button" @click="copyWeChatLink">
        <div v-if="!copied">
          <span class="fs-6">微信登入链接</span>
          <span class="bi bi-clipboard" />
        </div>
        <div v-else>
          <span class="me-3">已複製微信链接</span>
          <span class="bi bi-clipboard-check text-danger" />
        </div>
      </button>
      <button v-else class="btn btn-outline-success" type="button" disabled>
        <div class="spinner-border text-success spinner-border-sm" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </button>
    </div>
    <div v-if="copied" class="px-2 mt-2">
      <div class="alert alert-primary d-flex align-items-center" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        </svg>
          <p>请请在微信开启此链接</p>
      </div>
    </div>
    <div class="px-2">
      <h4 class="px-3 fs-6 text-center my-3 text-light mt-5">游戏大厅二维码</h4>
      <div class="alert alert-primary d-flex align-items-center" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </svg>
            <p>请用微信扫码或辨识进入游戏大厅</p>
        </div>
      <div class="d-flex w-100 justify-content-center">
        <img style="height:256px; width:256px;" :src="qrCode" alt="">
      </div>
    </div>
  </section>
  <section>
    <h3 class="px-3 fs-5 text-center my-3 text-light mt-5">新皇朝客服</h3>
    <div class="container">
      <ul class="d-flex flex-column gap-2 text-light">
        <li class="w-100">
          <div v-if="onLink !== ''" class="d-grid gap-2 col-6 mx-auto">
            <a class="btn btn-primary" type="button" :href="onLink[0].link"
              target="_blank">在线客服</a>
          </div>
          <div v-else class="d-grid gap-2 col-6 mx-auto">
            <button class="btn btn-primary" type="button" :href="onLink" disabled>
              <div class="spinner-border spinner-border-sm text-dark" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
        </li>
        <li class="bg-dark rounded" v-for="(service, i) in serviceList" :key="i">
          <div class="py-2 px-2 d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <img class="app-icon me-2" v-if="service.app === 'QQ'"
              src="https://xhcchat.com/resource/icons/qq.png" alt="QQIcon">
              <img class="app-icon me-2" v-if="service.app === 'weChat'"
              src="https://xhcchat.com/resource/icons/wechat.png" alt="wechatIcon">
              <img class="app-icon me-2" v-if="service.app === 'bat'"
              src="https://xhcchat.com/resource/icons/mo.png" alt="moIcon">
              <img class="app-icon me-2" v-if="service.app === 'tikTok'"
              src="https://xhcchat.com/resource/icons/tiktok.png" alt="tiktokIcon">
              <img class="app-icon me-2" v-if="service.app === 'kwai'"
              src="https://xhcchat.com/resource/icons/kwai.png" alt="kwaiIcon">
              <div v-if="service.app === 'weChat'">
                <p>微信客服: {{ service.name }}</p>
                <p>微信帐号: {{ service.account }}</p>
              </div>
              <div v-else-if="service.app === 'QQ'">
                <p>QQ 客服: {{ service.name }}</p>
                <p>QQ 帐号: {{ service.account }}</p>
              </div>
              <div v-else-if="service.app === 'bat'">
                <p>默信客服: {{ service.name }}</p>
                <p>默信帐号: {{ service.account }}</p>
              </div>
              <div v-else-if="service.app === 'tikTok'">
                <p>抖音客服: {{ service.name }}</p>
                <p>抖音帐号: {{ service.account }}</p>
              </div>
              <div v-else-if="service.app === 'kwai'">
                <p>快手客服: {{ service.name }}</p>
                <p>快手帐号: {{ service.account }}</p>
              </div>
            </div>
            <button type="button" class="btn btn-outline-primary" style="min-width:106px"
            @click.prevent="copyAccount(service)">
              <div v-if="!service.copied">
                <span class="fs-6">複製帐号</span>
                <span class="bi bi-clipboard" />
              </div>
              <div v-else>
                <span class="me-3">已複製</span>
                <span class="bi bi-clipboard-check text-danger" />
              </div>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </section>
  <section>
    <div class="d-flex justify-content-center flex-column align-items-center gap-3 my-5">
      <a style="width:65%;" type="button" class="btn btn-outline-light d-flex justify-content-center"
      href="https://apps.apple.com/cn/app/bf-messenger/id6443578460" target="_blank">
          <img class="app-icon-l" src="https://i.imgur.com/5jlhujC.png" alt="">
          <div class="ms-3">
            <h4 class="fs-5 fw-bolder text-center">BF Messenger</h4>
            <p class="">苹果手机请点击下载 APP</p>
          </div>
      </a>
      <button @click.prevent="downLoadFile" style="width:65%;" type="button" class="btn btn-outline-light d-flex justify-content-center">
          <img class="app-icon-l" src="https://i.imgur.com/i1Q9jG2.png" alt="">
          <div class="ms-3">
            <h4 class="fs-5 fw-bolder text-center">蝙蝠 APP</h4>
            <p class="">安卓手机请点击下载 APP</p>
          </div>
      </button>
    </div>
  </section>
</template>

<script>
import hcData from '../assets/dataFile/hcData.json'
import QRCode from 'qrcode'
// import emitter from '@/libs/emitter.js'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
export default {
  data () {
    return {
      url: process.env.VUE_APP_API,
      bannerList: hcData.banners.filter(i => i.group.includes('a')),
      noticeList: hcData.notifications.filter(i => i.group.includes('a')),
      serviceList: hcData.service.filter(i => i.group.includes('a')),
      h5Link: hcData.h5Link.filter(i => i.group.includes('a')),
      wcLink: hcData.wcLink.filter(i => i.group.includes('a')),
      onLink: hcData.onLineServe.filter(i => i.group.includes('a')),
      copied: false,
      qrCode: '',
      timestamp: hcData.update,
      options: {
        rewind: true,
        type: 'fade',
        autoplay: true,
        pagination: false
      },
      popConfirmCard: this.$swal.mixin({
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: '确定下载',
        cancelButtonText: '取消'
      })
    }
  },
  components: {
    Splide,
    SplideSlide
  },
  methods: {
    copyWeChatLink () {
      navigator.clipboard.writeText(this.wcLink[0].link)
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, '10000')
    },
    copyAccount (service) {
      navigator.clipboard.writeText(service.account)
      console.log(this.serviceList)
      this.serviceList.forEach(item => {
        item.copied = false
      })
      service.copied = true
    },
    downLoadFile () {
      this.popConfirmCard.fire({
        title: '确定下载文件?',
        text: '即将下载蝙蝠 APK 文件',
        icon: 'warning'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location = 'https://xhcchat.com/resource/bat.apk'
        }
      })
    },
    toQRcode (link) {
      QRCode.toDataURL(link)
        .then(url => {
          this.qrCode = url
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  mounted () {
    this.toQRcode(this.wcLink[0].link)
  }
}
</script>
