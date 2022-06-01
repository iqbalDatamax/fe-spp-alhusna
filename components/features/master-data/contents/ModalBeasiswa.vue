<template>
  <div>
    <modal name="modalBeasiswa" height="auto">
      <div class="p-4">
        <div class="flex justify-between border-b pb-3 mb-3">
          <h3 class="text-black font-semibold text-h3">{{model.edit ? 'Edit': 'Tambah'}} Penerima Beasiswa</h3>
          <i class="fas fa-times cursor-pointer" @click="handleClickModal('close')"></i>
        </div>
        <form-beasiswa :model="model" :periode="periode" :user="user" @clickModal="handleClickModal" />
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  components: {
    FormBeasiswa: () => import('@/components/features/master-data/contents/FormBeasiswa.vue')
  },
  props: {
    model: { type: Object, default:() => {} },
    user: { type: Array, default:()=> [] },
    periode: { type: Array, default:()=> [] }
  },
  methods: {
    handleClickModal(menu:any) {
      const _this = this as any
      if(menu === 'close') {
        _this.$modal.hide('modalBeasiswa')
      } else if (menu === 'submit') {
        _this.$emit('clickModal')
      }
    }
  }
})
</script>