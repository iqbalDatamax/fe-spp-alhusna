<template>
  <div>
    <div class="flex flex-row gap-3 items-center p-4 border-b shadow">
      <i class="fas fa-chevron-left text-xl text-black cursor-pointer" @click="$router.back()"></i>
      <p class="text-primary-dark font-medium text-sm capitalize">Pembayaran SPP</p>
    </div>
    <div class="p-3.5 grid grid-cols-1 gap-3.5">
      <select v-model="id_periode" class="base-input w-full">
        <option v-for="(dt, index) in listTa" :key="index" :value="dt.id">{{dt.tahunAjaran}}</option>
      </select>
      <div v-for="(dt, index) in rows" :key="index" class="w-full">
        <div class="shadow-md rounded-md p-2.5">
          <div class="flex justify-between pb-1 border-b border-black">
            <p class="text-sm text-primary-dark capitalize">Bulan {{dt.bulan}}</p>
            <p class="text-xs px-2 py-1 font-semibold rounded-full capitalize" :class="dt.status !== 'lunas' ? 'bg-danger-light text-danger-dark' : 'bg-primary-light text-primary-dark'">{{dt.status}}</p>
          </div>
          <div class="flex justify-between py-1">
            <p class="text-black text-xs">Besar Iuran</p>
            <p class="text-xs text-primary-dark">Rp. {{dt.ansuran}}</p>
          </div>
          <div class="flex justify-between pb-1">
            <p class="text-black text-xs">Beasiswa/Potongan</p>
            <p class="text-xs text-primary-dark">- Rp. {{dt.potongan === '-' ? 0 : dt.potongan }}</p>
          </div>
          <div class="flex justify-between py-1 border-t border-black">
            <p class="text-black text-xs">Total</p>
            <p class="text-sm text-primary-dark">Rp. {{dt.total}}</p>
          </div>
        </div>
      </div>
    </div>
    <q-loading class="print:hidden" :loading="loading" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { MasterService } from '~/systems/services/service-master-data'
import { PembayaranService } from '~/systems/services/services-pembayaran' 

export default Vue.extend({
  data() {
    return {
      pembayaranService: new PembayaranService(this.$axios),
      masterService: new MasterService(this.$axios),
      listTa: [] as any,
      id_periode: null,
      rows: [] as any,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  watch: {
    id_periode() {
      this.handleSearch()
    }
  },
  mounted(){
    this.initialize()
  },
  methods: {
    async initialize() {
      await this.fetchTa()
      this.handleSearch()
    },
    async fetchTa() {
      this.loading = true
      const _this = this as any
      const result = await this.masterService.request('list-ta')
      if(result.code === 200) {
        const data = result.data
        this.listTa = data
        this.id_periode= _this.listTa[0].id
        this.loading = false
      }
    },
    async handleSearch() {
      this.loading = true
      const data = {
        id_siswa: this.loggedInUser?.id,
        params : { periode: this.id_periode }
      }
      const result = await this.pembayaranService.request('spp-siswa', data)
      if(result.code === 200) {
        const data = result.data
        this.rows = data.dataSpp
        this.loading = false
      }
    },
  }
})
</script>