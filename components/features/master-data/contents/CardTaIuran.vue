<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div v-for="(item, index) in lists" :key="index" class="py-1.5 w-full">
          <div class="bg-primary-light rounded-md p-2">
            <div class="flex justify-between border-b border-black py-1">
              <p class="text-black text-xs">Kelas</p>
              <p class="text-sm text-primary-dark">{{item.namaKelas}}</p>
            </div>
            <div class="flex justify-between border-b border-black py-1">
              <p class="text-black text-xs">Besaran Iuran SPP</p>
              <p class="text-sm text-primary-dark">Rp. {{ currencyFormat(item.iuranSpp) || 0 }}</p>
            </div>
            <div class="flex justify-between border-b border-black py-1">
              <p class="text-black text-xs">Besaran IURAN Tahunan</p>
              <p class="text-sm text-primary-dark">Rp. {{ currencyFormat(item.iuranTahunan) || 0 }}</p>
            </div>
            <div class="flex justify-end">
              <button class="text-warning text-sm mt-2 font-semibold" @click="$emit('buttonEdit', item.id)"><i class="fas fa-pen mr-1"></i> Edit</button>
            </div>
          </div>
        </div>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { formatterCurrency } from '@/systems/helpers/formatter'

export default Vue.extend({
  props: {
    lists: { type: Array, default: () => [] }
  },
  methods: {
    currencyFormat(iuran:Number) {
      return formatterCurrency(iuran)
    }
  }
})
</script>