<template>
  <h3 class="text-light text-center mb-2">客服帳號</h3>
  <div class="text-light">
    <button type="button" class="btn btn-warning mb-3"
      @click="OpenEditServiceModal('new')">新增客服帳號</button>
    <ul class="mb-4">
      <li v-for="service in serviceList" :key="service.id" class="mb-2 border border-light p-2">
        <p>名稱：{{ service.name }}</p>
        <p>帳號：{{ service.account }}</p>
        <p v-if="service.type === 'weChat'">App：微信</p>
        <p v-else-if="service.type === 'QQ'">App：QQ</p>
        <p v-else-if="service.type === 'bat'">App：蝙蝠 / 默信</p>
        <div class="d-flex justify-content-around align-items-center">
          <p>顯示平台：
            <span v-for="item in service.group.length" :key="item - 1">
              {{ service.group[item - 1] }}
            </span>
          </p>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-success"
            @click="OpenEditServiceModal('edit', service)">編輯</button>
            <button type="button" class="btn btn-outline-danger"
            @click="OpenDeleteServiceModal(service)">刪除</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <editService :service="service" :state="state" ref="editServiceModal" @update="getServiceList" />
  <deleteService :service="service" ref="deleteServiceModal" @update="getServiceList" />
</template>

<script>
import emitter from '@/libs/emitter.js'
import editService from '@/components/editServiceView.vue'
import deleteService from '@/components/deleteServiceView.vue'
export default {
  data () {
    return {
      url: process.env.VUE_APP_API,
      serviceList: [],
      service: {},
      state: ''
    }
  },
  components: {
    editService,
    deleteService
  },
  methods: {
    getServiceList () {
      const api = `${this.url}/service`
      this.$http.get(api)
        .then(res => {
          this.serviceList = res.data.data
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
    OpenEditServiceModal (state, ...service) {
      if (state === 'new') {
        this.state = 'new'
        this.service = {
          url: '',
          group: []
        }
      } else {
        this.state = 'edit'
        this.service = { ...service[0] }
      }
      this.$refs.editServiceModal.openModal()
    },
    OpenDeleteServiceModal (service) {
      this.service = service
      this.$refs.deleteServiceModal.openModal()
    }
  },
  mounted () {
    this.getServiceList()
  }
}
</script>
