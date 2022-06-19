<template>
  <div>
    <modal name="modalBayarEkskul" width="700" height="auto" :scrollable="true">
      <div class="p-4">
        <content-print :siswa="siswa" :ta="ta" :ansuran="ansuran" :keterangan="keterangan" :tgl="tgl" />
        <!-- button -->
        <div class="flex my-3 border-t pt-3 justify-end gap-3">
          <button class="btn-secondary" @click="handleClickModal('close')"> Cancel </button>
          <button class="w-2/6 btn-primary" @click="handleClickModal('submit')"> Submit Pembayaran</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {
    ContentPrint: () => import('@/components/features/pembayaran-ekskul/contents/ContentPrint.vue')
  },
  props: {
    ansuran: { type: [Number,String], default: null },
    keterangan: {type: String, default: ''},
    siswa: { type: Object, default: () => {} },
    ta: {type: String, default: ''},
    tgl: {type: String, default: null}
  },
  methods: {
    handleClickModal(menu:any) {
      const _this = this as any
      if(menu === 'close') {
        _this.$modal.hide('modalBayarEkskul')
      } else if (menu === 'submit') {
        _this.$emit('clickModal')
      }
    }
  }
})
</script>
