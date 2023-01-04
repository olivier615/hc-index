<template>
  <h2 class="text-light text-center mb-3">加碼專區</h2>
  <div class="text-center mt-3">
    <button type="button" class="btn btn-danger ms-3"
    @click="openEditBonusModal('new')">
      新增加碼
    </button>
  </div>
  <div class="text-center mt-3">
    <button type="button" class="btn btn-danger ms-3"
    @click="openEditBonusModal('delete')">
      刪除獎項
    </button>
  </div>
  <editBonus ref="editBonusModal" :state="state" />
</template>

<script>
import editBonus from '@/components/editBonusView.vue'
export default {
  data () {
    return {
      url: process.env.VUE_APP_API,
      state: ''
    }
  },
  components: {
    editBonus
  },
  methods: {
    openEditBonusModal (state) {
      this.state = state
      this.$refs.editBonusModal.openModal()
    }
  }
}
</script>
