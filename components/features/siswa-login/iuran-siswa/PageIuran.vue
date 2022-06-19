<template>
  <div>
    <div class="flex flex-row gap-3 items-center p-4 border-b shadow">
      <i class="fas fa-chevron-left text-xl text-black cursor-pointer" @click="$router.back()"></i>
      <p class="text-primary-dark font-medium text-sm capitalize">Pembayaran IURAN</p>
    </div>
    <div class="p-4 grid grid-cols-1 gap-3.5">
      <div class="w-full">
        <div>
          <div class="flex justify-between pb-1 border-b border-black">
            <p class="text-sm text-primary-dark">Status</p>
            <p class="text-xs px-2 py-1 font-semibold rounded-full capitalize" :class="dataIuran.status !== 'lunas' ? 'bg-danger-light text-danger-dark' : 'bg-primary-light text-primary-dark'">{{dataIuran.status}}</p>
          </div>
          <div class="flex justify-between py-1">
            <p class="text-black text-xs">Besar Iuran</p>
            <p class="text-xs text-primary-dark">Rp. {{currencyFormat(dataIuran.iuran)}}</p>
          </div>
          <div class="flex justify-between pb-1">
            <p class="text-black text-xs">Beasiswa/Potongan</p>
            <p class="text-xs text-primary-dark">- Rp. {{currencyFormat(dataIuran.potongan) || 0}}</p>
          </div>
          <div class="flex justify-between pb-1">
            <p class="text-black text-xs">Sudah Dibayar</p>
            <p class="text-xs text-primary-dark">Rp. {{currencyFormat(dataIuran.ansuran) || 0}}</p>
          </div>
          <div class="flex justify-between py-1 border-t border-black">
            <p class="text-black text-xs">Sisa Tunggakan</p>
            <p class="text-sm text-danger-dark">Rp. {{currencyFormat(dataIuran.sisaBayar) || 0}}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="rows && rows.length > 0" class="p-4">
      <p class="text-black font-medium text-sm mb-2">Histori Pembayaran Iuran</p>
      <div v-for="(dt, index) in rows" :key="index" class="flex justify-between p-y">
        <p class="text-xs text-black">Tanggal {{dt.tanggalBayar}}</p>
        <p class="text-xs py-1 font-semibold rounded-full text-primary-dark">Rp {{dt.iuran}}</p>
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
import { formatterCurrency } from '@/systems/helpers/formatter'

export default Vue.extend({
  data() {
    return {
      pembayaranService: new PembayaranService(this.$axios),
      masterService: new MasterService(this.$axios),
      listTa: [] as any,
      id_periode: null,
      dataIuran: {} as any,
      rows: [] as any,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  mounted(){
    this.initialize()
  },
  methods: {
    async initialize() {
      await this.fetchTa()
      this.handleSearch()
      this.cekHistoryPembayaran()
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
      const result = await this.pembayaranService.request('iuran-siswa', data)
      if(result.code === 200) {
        const data = result.data
        this.dataIuran = data.dataIuran
        this.loading = false
      }
    },
    currencyFormat(nominal:any) {
      return formatterCurrency(nominal)
    },
    async cekHistoryPembayaran() {
      const data = {
        id_siswa: this.loggedInUser?.id,
        params : { id_periode: this.id_periode }
      }
      const result = await this.pembayaranService.request('pembayaran-history', data)
      if(result.code === 200) {
        this.rows = result.data
      }
    },
  }
})
</script>