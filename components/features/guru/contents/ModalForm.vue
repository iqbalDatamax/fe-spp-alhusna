<template>
  <div>
    <modal name="modalFormGuru" height="auto">
      <div class="p-4">
        <div class="flex justify-between border-b pb-3 mb-3">
          <h3 class="text-black font-semibold text-h3">{{model.edit ? 'Edit': 'Tambah'}} Guru</h3>
          <i class="fas fa-times cursor-pointer" @click="handleClickModal('close')"></i>
        </div>
        <form-guru :model="model" @clickModal="handleClickModal" />
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  components: {
    FormGuru: () => import('@/components/features/guru/contents/FormGuru.vue')
  },
  props: {
    model: { type: Object, default:() => {} }
  },
  methods: {
    handleClickModal(menu:any) {
      const _this = this as any
      if(menu === 'close') {
        _this.$modal.hide('modalFormGuru')
      } else if (menu === 'submit') {
        _this.$emit('clickModal')
      }
    }
  }
})
</script>