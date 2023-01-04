<template>
  <div
    id="editBasicModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="editBasicModal" class="modal-title">
            <span>調整基礎獎金</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">基礎獎金</span>
            <input type="text" class="form-control" v-model="editData.basic">
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
      if (this.editData.basic <= 0) {
        const info = {
          icon: 'warning',
          title: '基礎獎金有誤'
        }
        emitter.emit('popToast', info)
        return
      }
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
