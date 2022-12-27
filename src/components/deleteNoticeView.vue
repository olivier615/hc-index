<template>
  <div
    id="deleteNoticeModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="deleteNoticeModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="deleteNoticeModal" class="modal-title">
            <span>刪除通知訊息</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p class="text-danger text-center fw-bold fs-5">刪除此通知訊息？</p>
          <p class="text-center">{{ notice.info }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger"
          @click="deleteNotice">
            刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter.js'
import Modal from 'bootstrap/js/dist/modal'
export default {
  data () {
    return {
      url: process.env.VUE_APP_API,
      modal: ''
    }
  },
  props: ['notice'],
  methods: {
    deleteNotice () {
      const id = this.notice._id
      this.$http.delete(`${this.url}/info/${id}`)
        .then(res => {
          this.hideModal()
          this.$emit('update')
          const info = {
            icon: 'success',
            title: '已刪除通知訊息'
          }
          this.$emit('update')
          emitter.emit('popToast', info)
        })
        .catch(err => {
          const info = {
            icon: 'error',
            title: err.response.data.message
          }
          emitter.emit('popToast', info)
        })
    },
    openModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static'
    })
  }
}
</script>
