<template>
  <h2 class="text-light text-center my-3 fw-bold fs-1">獎池遙控器</h2>
  <div class="text-light text-center fs-3 my-3">
    <h4>當前總獎金</h4>
    <p class="text-warning fs-1 fw-bold" v-if="data.activeManual">{{ data.manual }}</p>
    <p class="text-warning fs-1 fw-bold" v-else>{{ sales }}</p>
  </div>
  <div class="fs-4 settingContainer text-light d-flex flex-column justify-content-center align-items-center">
    <div class="mb-5 w-100 px-2">
      <p class="me-3 text-center mb-2">當前流水號</p>
      <div class="tabControlContainer d-flex justify-content-center">
        <span class="me-3" @click="sellTicket(-1)"><i class="bi bi-dash-circle"></i></span>
        <p>{{ data.ticket }}</p>
        <span class="ms-3 text-primary" @click="sellTicket(1)"><i class="bi bi-plus-circle-fill"></i></span>
      </div>
      <div class="d-flex justify-content-center">
        <button class="btn btn-outline-success btn-sm mt-4" @click="openModal('ticket')">手動操作流水號</button>
      </div>
    </div>
    <div class="mb-5 w-100 px-2">
      <h4 class="text-center">贊助列表</h4>
      <div class="d-flex justify-content-center my-3">
        <button class="btn btn-outline-success btn-sm my-3" @click="openModal('donate')">增加贊助</button>
      </div>
      <ul class="pt-2">
        <li class="d-flex my-2" v-for="donate in this.data.donate" :key="donate._id">
          <span class="mx-3" @click="openModal('deleteSponsor', donate)"><i class="bi bi-x-circle"></i></span>
          <p>{{ donate.sponsor }}</p>
          <p>贊助 {{ donate.bonus }}</p>
        </li>
      </ul>
    </div>
    <div class="coverPriceContainer">
      <h4 class="text-center my-3">
        <span>自訂獎金</span>
        <span class="fs-6 ms-3">
          {{ data.activeManual ? '啟用中' : '未使用' }}
        </span>
      </h4>
      <p class="my-3" v-if="data.activeManual">自訂獎金: {{ data.manual }}</p>
      <p class="my-3" v-else><s>自訂獎金: {{ data.manual }}</s></p>
      <div class="d-flex justify-content-center my-3">
        <button class="btn btn-outline-success btn-sm my-3" @click="openModal('manual')">手動調整總獎金</button>
      </div>
    </div>
    <div class="basicPriceContainer mb-5">
      <h4 class="my-3 text-center">基礎獎金</h4>
      <p class="my-3">獎池基底: {{ data.basic }}</p>
      <div class="d-flex justify-content-center my-3">
        <button class="btn btn-outline-success btn-sm my-3" @click="openModal('basic')">更改獎池基底</button>
      </div>
    </div>
  </div>
  <editTicket :data="data" @update="getCounting" ref="editTicketModal" />
  <editDonate :data="data" @update="getCounting" ref="editDonateModal" />
  <editManual :data="data" @update="getCounting" ref="editManualModal" />
  <editBasic :data="data" @update="getCounting" ref="editBasicModal" />
  <deleteDonate :data="data" :donate="donate" @update="getCounting" ref="deleteDonateModal" />
</template>

<script>
import editTicket from '@/components/editTicketView.vue'
import editDonate from '@/components/editDonateView.vue'
import editManual from '@/components/editManualView.vue'
import editBasic from '@/components/editBasicView.vue'
import deleteDonate from '@/components/deleteDonateView.vue'
export default {
  data () {
    return {
      data: {},
      url: process.env.VUE_APP_API,
      sales: 9999,
      donate: {}
    }
  },
  components: {
    editTicket,
    editDonate,
    editManual,
    editBasic,
    deleteDonate
  },
  methods: {
    getCounting () {
      this.$http.get(this.url)
        .then(res => {
          this.data = res.data.data[0]
          let donate = 0
          this.data.donate.forEach(item => {
            donate += item.bonus
          })
          this.sales = ((this.data.ticket - 1) * 500) + this.data.basic + donate
        })
        .catch(err => {
          const info = {
            icon: 'error',
            title: err.response.data.message
          }
          console.log(info)
        })
    },
    sellTicket (num) {
      this.data.ticket += num
      this.patchCounting()
    },
    openModal (type, obj) {
      if (type === 'ticket') {
        this.$refs.editTicketModal.openModal()
      } else if (type === 'donate') {
        this.$refs.editDonateModal.openModal()
      } else if (type === 'deleteSponsor') {
        this.donate = obj
        this.$refs.deleteDonateModal.openModal()
      } else if (type === 'manual') {
        this.$refs.editManualModal.openModal()
      } else if (type === 'basic') {
        this.$refs.editBasicModal.openModal()
      }
    },
    patchCounting () {
      const id = this.data._id
      const newData = { ...this.data }
      this.$http.patch(`${this.url}/${id}`, newData)
        .then(res => {
          this.getCounting()
        })
        .catch(err => {
          const info = {
            icon: 'error',
            title: err.response.data.message
          }
          console.log(info)
        })
    }
  },
  mounted () {
    this.getCounting()
  }
}
</script>
