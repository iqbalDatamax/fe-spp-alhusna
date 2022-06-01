<template>
  <div>
    <modal name="modalPembayaran" width="700" height="auto" :scrollable="true">
      <div class="p-4">
        <content-print :siswa="siswa" :ta="ta" :list="list" :tgl="tgl" />
        <!-- button -->
        <div class="flex my-3 border-t pt-3 justify-end gap-3">
          <button class="btn-secondary" @click="handleClickModal('close')"> Cancel </button>
          <button class="w-2/6 btn-primary" @click="$emit('clickModal', 'submit')"> Submit Pembayaran</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { formatterNumber, formatterCurrency } from '@/systems/helpers/formatter'

export default Vue.extend({
  components: {
    ContentPrint: () => import('@/components/features/pembayaran-spp/contents/ContentPrint.vue')
  },
  props: {
    list: { type: Array, default: () => [] },
    siswa: { type: Object, default: () => {} },
    ta: {type: String, default: ''},
    tgl: {type: String, default: null}
  },
  computed: {
    subTotal() {
      let total = 0
      this.list.forEach((item:any) => {
        const number = formatterNumber(item.ansuran) || 0
        total += number
      })
      return formatterCurrency(total)
    },
    potongan() {
      let total = 0
      this.list.forEach((item:any) => {
        const number = formatterNumber(item.potongan) || 0
        total += number
      })
      return formatterCurrency(total)
    },
    grandTotal() {
      let total = 0
      this.list.forEach((item:any) => {
        const number = formatterNumber(item.total) || 0
        total += number
      })
      return formatterCurrency(total)
    }
  },
  methods: {
    handleClickModal(menu:any) {
      const _this = this as any
      if(menu === 'close') {
        _this.$modal.hide('modalPembayaran')
      } else if (menu === 'submit') {
        _this.$emit('clickModal')
      }
    }
  }
})
</script>
