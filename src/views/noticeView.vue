<template>
  <h3 class="text-light text-center mb-2">通知訊息</h3>
  <div class="text-light">
    <button type="button" class="btn btn-warning mb-3"
      @click="OpenEditNoticeModal('new')">新增通知訊息</button>
    <ul class="mb-4">
      <li v-for="notice in noticeList" :key="notice.id" class="mb-2 border border-light p-2">
        <p class="text-center mb-2 py-2 border-bottom border-light fw-bold">{{ notice.info }}</p>
        <div class="d-flex justify-content-around align-items-center">
          <p>顯示平台：
            <span v-for="item in notice.group.length" :key="item - 1">
              {{ notice.group[item - 1] }}
            </span>
          </p>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-success"
            @click="OpenEditNoticeModal('edit', notice)">編輯</button>
            <button type="button" class="btn btn-outline-danger"
            @click="OpenDeleteNoticeModal(notice)">刪除</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <editNotice :notice="notice" :state="state" ref="editNoticeModal" @update="getNoticeList" />
  <deleteNotice :notice="notice" ref="deleteNoticeModal" @update="getNoticeList" />
</template>

<script>
import emitter from '@/libs/emitter.js'
import editNotice from '@/components/editNoticeView.vue'
import deleteNotice from '@/components/deleteNoticeView.vue'
export default {
  data () {
    return {
      url: process.env.VUE_APP_API,
      noticeList: [],
      notice: {},
      state: ''
    }
  },
  components: {
    editNotice,
    deleteNotice
  },
  methods: {
    getNoticeList () {
      const api = `${this.url}/info`
      this.$http.get(api)
        .then(res => {
          this.noticeList = res.data.data
        })
        .catch(err => {
          const info = {
            icon: 'error',
            title: err.response.data.message
          }
          emitter.emit('popToast', info)
        })
    },
    OpenEditNoticeModal (state, ...notice) {
      if (state === 'new') {
        this.state = 'new'
        this.notice = {
          url: '',
          group: []
        }
      } else {
        this.state = 'edit'
        this.notice = { ...notice[0] }
      }
      this.$refs.editNoticeModal.openModal()
    },
    OpenDeleteNoticeModal (notice) {
      this.notice = notice
      this.$refs.deleteNoticeModal.openModal()
    }
  },
  mounted () {
    this.getNoticeList()
  }
}
</script>
