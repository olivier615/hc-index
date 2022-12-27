<template>
  <div
    id="editBannerModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="editBannerModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="editBannerModal" class="modal-title">
            <span v-if="state === 'new'">新增輪播圖</span>
            <span v-else>編輯輪播圖</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <img v-if="editingBanner.url" style="width:100%" class="rounded mx-auto d-block mb-2"
            :src="editingBanner.url" alt="">
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">連結</span>
            <input type="text" class="form-control" v-model="editingBanner.url">
          </div>
          <div class="d-flex">
            <p>顯示於平台：</p>
            <div class="form-check ms-3">
              <input v-model="editingBanner.group" class="form-check-input" type="checkbox" value="a" id="xhc2a">
              <label class="form-check-label" for="xhc2a">
                A
              </label>
            </div>
            <div class="form-check ms-3">
              <input v-model="editingBanner.group" class="form-check-input" type="checkbox" value="b" id="xhc2b">
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
          @click="saveBanner">
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
      editingBanner: {}
    }
  },
  props: ['banner', 'state'],
  methods: {
    saveBanner () {
      const api = `${this.url}/banner`
      if (this.state === 'new') {
        this.$http.post(api, this.editingBanner)
          .then(res => {
            this.hideModal()
            this.editingBanner = {
              url: '',
              group: []
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
        const id = this.editingBanner._id
        this.$http.patch(`${api}/${id}`, this.editingBanner)
          .then(res => {
            this.hideModal()
            this.editingBanner = {
              url: '',
              group: []
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
    banner () {
      this.editingBanner = this.banner
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
