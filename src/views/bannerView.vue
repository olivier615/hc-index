<template>
  <h3 class="text-light text-center mb-2">輪播圖</h3>
  <div class="text-light">
    <button type="button" class="btn btn-warning mb-3"
      @click="OpenEditBannerModal('new')">新增輪播圖</button>
    <ul class="mb-4">
      <li v-for="banner in bannerList" :key="banner.id" class="mb-2 border border-light p-2">
        <img style="width:100%" class="rounded mx-auto d-block mb-2"
        :src="banner.url" alt="">
        <div class="d-flex justify-content-around align-items-center">
          <p>顯示平台：
            <span v-for="item in banner.group.length" :key="item - 1">
              {{ banner.group[item - 1] }}
            </span>
          </p>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-success"
            @click="OpenEditBannerModal('edit', banner)">編輯</button>
            <button type="button" class="btn btn-outline-danger"
            @click="OpenDeleteBannerModal(banner)">刪除</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <editBanner :banner="banner" :state="state" ref="editBannerModal" @update="getBannerList" />
  <deleteBanner :banner="banner" ref="deleteBannerModal" @update="getBannerList" />
</template>

<script>
import emitter from '@/libs/emitter.js'
import editBanner from '@/components/editBannerView.vue'
import deleteBanner from '@/components/deleteBannerView.vue'
export default {
  data () {
    return {
      url: process.env.VUE_APP_API,
      bannerList: [],
      banner: {},
      state: ''
    }
  },
  components: {
    editBanner,
    deleteBanner
  },
  methods: {
    getBannerList () {
      const api = `${this.url}/banner`
      this.$http.get(api)
        .then(res => {
          this.bannerList = res.data.data
        })
        .catch(err => {
          const info = {
            icon: 'error',
            title: err.response.data.message
          }
          emitter.emit('popToast', info)
          this.isLoading = false
        })
    },
    OpenEditBannerModal (state, ...banner) {
      if (state === 'new') {
        this.state = 'new'
        this.banner = {
          url: '',
          group: []
        }
      } else {
        this.state = 'edit'
        this.banner = { ...banner[0] }
      }
      this.$refs.editBannerModal.openModal()
    },
    OpenDeleteBannerModal (banner) {
      this.banner = banner
      this.$refs.deleteBannerModal.openModal()
    }
  },
  mounted () {
    this.getBannerList()
  }
}
</script>
