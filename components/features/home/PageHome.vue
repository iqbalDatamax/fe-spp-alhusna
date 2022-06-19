<template>
  <div>
    <content-body title="Dashboard" icon="fas fa-tv">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-2.5">
        <div v-for="(item, index) in lists" :key="index" class="p-2.5 w-full">
          <div class="bg-gradient-to-r from-primary to-blue-400 shadow-md rounded p-4 flex justify-between items-center h-32">
            <div class="mr-6">
              <p class="text-h3 text-white font-normal">{{item.text}}</p>
              <p class="text-4xl mt-4 text-black font-semibold">{{item.value || 0}}</p>
            </div>
            <div><i class="text-white text-5xl" :class="item.icon"></i></div>
          </div>
        </div>
      </div>
    </content-body>
    <q-loading :loading="loading" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PembayaranService } from '~/systems/services/services-pembayaran' 
import { MasterService } from '~/systems/services/service-master-data' 
import { formatterCurrency } from '@/systems/helpers/formatter'

export default Vue.extend({
  components: {
    ContentBody: () => import('@/components/features/public/body-content/BodyContent.vue')
  },
  data() {
    return {
      masterService: new MasterService(this.$axios),
      pembayaranService: new PembayaranService(this.$axios),
      id_periode: null,
      lists: [
        { id: 1, icon: 'fas fa-users', text: 'Total Siswa Aktif', value: 0 },
        { id: 2, icon: 'fas fa-user-check', text: 'Total Siswa Sudah Bayar SPP Bulan Ini', value: 0 },
        { id: 3, icon: 'fas fa-user', text: 'Total Siswa Belum Bayar SPP Bulan Ini', value: 0 },
        { id: 4, icon: 'fas fa-money-bill', text: 'Total Pembayaran SPP Bulan Ini', value: 0 },
        { id: 5, icon: 'fas fa-dollar-sign', text: 'Total Tunggakan SPP Bulan Ini', value: 0 },
        { id: 6, icon: 'fas fa-money-bill-wave', text: 'Total Pembayaran Iuran Tahunan', value: 0 },
        { id: 7, icon: 'fas fa-hand-holding-usd', text: 'Total Tunggakan Iuran Tahunan', value: 0 }
      ] as any,
      loading: false
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize(){
      this.loading = true
      await this.fetchTa()
      this.getTotalSiswa()
      this.getTotalSpp()
      this.getTotalIuran()
      this.loading = false
    },
    async getTotalSiswa() {
      const params = { id_periode: this.id_periode}
      const result = await this.pembayaranService.request('total-siswa', params)
      this.lists[0].value = formatterCurrency(result.siswaAktif || null)
      this.lists[1].value = formatterCurrency(result.totalLunas || null)
      this.lists[2].value = formatterCurrency(result.totalNotLunas || null)
    },
    async getTotalSpp() {
      const params = { id_periode: this.id_periode}
      const result = await this.pembayaranService.request('total-spp', params)
      this.lists[3].value = formatterCurrency(result.total || null)
      this.lists[4].value = formatterCurrency(result.totalBelumBayar || null)
    },
    async getTotalIuran() {
      const params = { id_periode: this.id_periode}
      const result = await this.pembayaranService.request('total-iuran', params)
      this.lists[5].value = formatterCurrency(result.total || null)
      this.lists[6].value = formatterCurrency(result.totalBelumBayar || null)
    },
    async fetchTa() {
      const result = await this.masterService.request('list-ta')
      if(result.code === 200) {
        const data = result.data
        this.id_periode = data[0].id
      }
    },

  }
})
</script>