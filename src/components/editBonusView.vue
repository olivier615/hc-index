<template>
  <div
    id="editBonusModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="editBonusModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="editBonusModal" class="modal-title">
            <span v-if="state === 'new'">新增加碼獎金</span>
            <span v-else>刪除獎項</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <select v-if="state === 'delete'" class="form-select mb-3" v-model="selectOrder" @change="getOrder">
            <option selected disabled>選擇獎項</option>
            <option v-for="(item) in data" :value="item._id" :key="item._id">{{ item.order }}: {{ item.content }}</option>
          </select>
          <div v-else class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">獎項排序</span>
            <input type="number" class="form-control" v-model="order">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">獎品名稱</span>
            <input v-if="state === 'new'" type="text" class="form-control" v-model="content">
            <input v-else type="text" class="form-control" v-model="deleteOrder.content" disabled>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">得獎人</span>
            <input v-if="state === 'new'" type="text" class="form-control" v-model="winner">
            <input v-else type="text" class="form-control" v-model="deleteOrder.winner" disabled>
          </div>
          <p v-if="state === 'new'" class="text-center">得獎人可不填</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button v-if="state === 'new'" type="button" class="btn btn-danger" @click="addNewBonus">
            儲存
          </button>
          <button v-else type="button" class="btn btn-danger" @click="deleteBonus">
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
      data: {},
      selectOrder: '選擇獎項',
      modal: '',
      content: '',
      winner: '',
      deleteOrder: {},
      order: 0
    }
  },
  props: ['state'],
  methods: {
    openModal () {
      this.selectOrder = '選擇獎項'
      this.deleteOrder = {}
      this.content = ''
      this.order = 0
      this.winner = ''
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    },
    getLuckyDraw () {
      this.$http.get(this.url + '/luckyDraw')
        .then(res => {
          this.data = res.data.data
        })
        .catch(err => {
          const info = {
            icon: 'error',
            title: err.response.data.message
          }
          emitter.emit('popToast', info)
        })
    },
    addNewBonus () {
      if (this.content.trim() === '') {
        const info = {
          icon: 'warning',
          title: '未填寫獎項內容'
        }
        emitter.emit('popToast', info)
        return
      }
      if (this.order === undefined || this.order === '') {
        const info = {
          icon: 'warning',
          title: '未填寫獎項排序'
        }
        emitter.emit('popToast', info)
        return
      }
      const newData = {
        content: this.content,
        winner: this.winner,
        order: this.order
      }
      this.$http.post(this.url + '/luckyDraw', newData)
        .then(res => {
          const info = {
            icon: 'success',
            title: '更新成功'
          }
          emitter.emit('popToast', info)
          this.hideModal()
        })
        .catch(err => {
          const info = {
            icon: 'error',
            title: err.response.data.message
          }
          emitter.emit('popToast', info)
        })
    },
    getOrder () {
      this.data.forEach(item => {
        if (item._id === this.selectOrder) {
          this.deleteOrder = item
        }
      })
    },
    deleteBonus () {
      const id = this.deleteOrder._id
      this.$http.delete(`${this.url}/luckyDraw/${id}`)
        .then(res => {
          const info = {
            icon: 'success',
            title: '刪除成功'
          }
          this.getLuckyDraw()
          emitter.emit('popToast', info)
          this.hideModal()
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
  mounted () {
    this.getLuckyDraw()
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static'
    })
  }
}
</script>
