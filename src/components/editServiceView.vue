<template>
  <div
    id="editServiceModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="editServiceModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="editServiceModal" class="modal-title">
            <span v-if="state === 'new'">新增客服帳號</span>
            <span v-else>編輯客服帳號</span>
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
            <span class="input-group-text" id="inputGroup-sizing-default">名稱</span>
            <input type="text" class="form-control" v-model="editingService.name">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">帳號</span>
            <input type="text" class="form-control" v-model="editingService.account">
          </div>
          <div class="d-flex gap-3 mb-2">
            <p>App：</p>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="appGroup" value="weChat" id="app01"
              v-model="editingService.type" checked>
              <label class="form-check-label" for="app01">
                微信
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="appGroup" value="QQ" id="app02"
              v-model="editingService.type">
              <label class="form-check-label" for="app02">
                QQ
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="appGroup" value="bat" id="app03"
              v-model="editingService.type">
              <label class="form-check-label" for="app03">
                蝙蝠 / 默信
              </label>
            </div>
          </div>
          <div class="d-flex">
            <p>顯示於平台：</p>
            <div class="form-check ms-3">
              <input v-model="editingService.group" class="form-check-input" type="checkbox" value="a" id="xhc2a">
              <label class="form-check-label" for="xhc2a">
                A
              </label>
            </div>
            <div class="form-check ms-3">
              <input v-model="editingService.group" class="form-check-input" type="checkbox" value="b" id="xhc2b">
              <label class="form-check-label" for="xhc2b">
                B
              </label>
            </div>
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
          @click="saveService">
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
      editingService: {}
    }
  },
  props: ['service', 'state'],
  methods: {
    saveService () {
      const api = `${this.url}/service`
      if (this.state === 'new') {
        this.$http.post(api, this.editingService)
          .then(res => {
            this.hideModal()
            this.editingService = {
              name: '',
              group: [],
              account: '',
              type: ''
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
      } else if (this.state === 'edit') {
        const id = this.editingService._id
        this.$http.patch(`${api}/${id}`, this.editingService)
          .then(res => {
            this.hideModal()
            this.editingService = {
              name: '',
              group: [],
              account: '',
              type: ''
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
      }
    },
    openModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    }
  },
  watch: {
    service () {
      this.editingService = this.service
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
