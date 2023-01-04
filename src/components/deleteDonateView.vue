<template>
  <div
    id="editDonateModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="editDonateModal" class="modal-title">
            <span >移除贊助</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3 text-center">
            <span>贊助人</span>
            <p>{{ donate.sponsor }}</p>
          </div>
          <div class="mb-3 text-center">
            <span>金額</span>
            <p>{{ donate.bonus }}</p>
          </div>
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
          @click="deleteDonate()">
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
      modal: '',
      editData: {}
    }
  },
  props: ['data', 'donate'],
  methods: {
    deleteDonate () {
      const donateId = this.donate._id
      this.editData = { ...this.data }
      const index = this.editData.donate.findIndex(item => item._id === donateId)
      this.editData.donate.splice(index, 1)
      const id = this.data._id
      this.$http.patch(`${this.url}/counting/${id}`, this.editData)
        .then(res => {
          this.$emit('update')
          this.hideModal()
          const info = {
            icon: 'success',
            title: '更新成功'
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
