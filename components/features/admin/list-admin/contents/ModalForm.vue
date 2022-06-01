<template>
  <div>
    <modal name="modalFormAdmin" height="auto">
      <div class="p-4">
        <div class="flex justify-between border-b pb-3 mb-3">
          <h3 class="text-black font-semibold text-h3">{{model.edit ? 'Edit': 'Tambah'}} admin</h3>
          <i class="fas fa-times cursor-pointer" @click="handleClickModal('close')"></i>
        </div>
        <form-admin :model="model" @clickModal="handleClickModal" />
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  components: {
    FormAdmin: () => import('@/components/features/admin/list-admin/contents/FormAdmin.vue')
  },
  props: {
    model: { type: Object, default:() => {} }
  },
  methods: {
    handleClickModal(menu:any) {
      const _this = this as any
      if(menu === 'close') {
        _this.$modal.hide('modalFormAdmin')
      } else if (menu === 'submit') {
        _this.$emit('clickModal')
      }
    }
  }
})
</script>