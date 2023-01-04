<template>
  <div
    id="editTicketModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="editTicketModal" class="modal-title">
            <span >手動調整流水號</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <span>輸入當前即將賣出的第一張流水號碼</span>
          <div class="input-group mb-3 mt-2">
            <span class="input-group-text" id="inputGroup-sizing-default">流水號</span>
            <input type="text" class="form-control" v-model="editData.ticket">
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
          @click="patchCounting()">
            儲存
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
  props: ['data'],
  watch: {
    data () {
      this.editData = { ...this.data }
    }
  },
  methods: {
    patchCounting () {
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
