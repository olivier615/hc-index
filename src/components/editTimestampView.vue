<template>
  <div
    id="editTimestampModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="editTimestampModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="editTimestampModal" class="modal-title">
            <span v-if="state === 'new'">新增通知訊息</span>
            <span v-else>編輯最後更新時間</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="input-group mb-2">
            <textarea class="form-control" v-model="editingStamp.timestamp"></textarea>
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
          @click="saveStamp">
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
      editingStamp: {}
    }
  },
  props: ['stamp', 'state'],
  methods: {
    saveStamp () {
      const api = `${this.url}/timestamp`
      const id = this.editingStamp._id
      this.$http.patch(`${api}/${id}`, this.editingStamp)
        .then(res => {
          this.hideModal()
          this.editingStamp = {
            timestamp: ''
          }
          this.$emit('update')
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
  watch: {
    stamp () {
      this.editingStamp = this.stamp
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
