<template>
  <div>
    <content-body title="Pembayaran SPP" icon="fas fa-cash-register" class="print:hidden">
      <card-search-siswa :periode="listTa" :list-siswa="listSiswa" :value="model" @clickButton="handleSearch" />
      <div v-if="rows.length > 0">
        <card-data-siswa :siswa="dataSiswa" />
        <div class="shadow p-2.5 border rounded mt-4">
          <div v-if="rows && rows.length > 0" class="overflow-x-auto pb-4">
            <table-checked :with-check="true" :columns="columns" :rows="rows" :action-content="actionContent" :top-action="topAction" @clickButton="handleButton" @clickActionTop="handleActionTop" />
          </div>
        </div>
      </div>
      <div v-else class="my-6 p-4 shadow-sm border rounded-md">
        <p class="text-center text-black font-semibold text-sm">Input periode dan NIS atau Nama Siswa untuk mencari pembayaran siswa ....</p>
      </div>
    </content-body>
    <div class="px-2 py-1 hidden print:block">
      <content-print :siswa="dataSiswa" :ta="periode" :list="listSpp" :tgl="tgl" />
    </div>
    <modal-review-bayar :siswa="dataSiswa" :ta="periode" :list="listSpp" :tgl="tgl" class="print:hidden" @clickModal="handleModal" />
    <q-loading class="print:hidden" :loading="loading" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { UsersService } from '~/systems/services/service-users'
import { MasterService } from '~/systems/services/service-master-data' 
import { PembayaranService } from '~/systems/services/services-pembayaran' 
import { dateFormatter, formatterNumber } from '@/systems/helpers/formatter'

export default Vue.extend({
  components: {
    ContentBody: () => import('@/components/features/public/body-content/BodyContent.vue'),
    CardSearchSiswa: () => import('@/components/features/pembayaran-spp/contents/CardSearchSiswa.vue'),
    CardDataSiswa: () => import('@/components/features/pembayaran-spp/contents/CardDataSiswa.vue'),
    TableChecked: () => import('~/components/features/public/table/TableChecked.vue'),
    ModalReviewBayar: () => import('~/components/features/pembayaran-spp/contents/ModalReviewBayar.vue'),
    ContentPrint: () => import('@/components/features/pembayaran-spp/contents/ContentPrint.vue')
  },
  data(){
    return {
      usersService: new UsersService(this.$axios),
      masterService: new MasterService(this.$axios),
      pembayaranService: new PembayaranService(this.$axios),
      listSiswa: [],
      listTa: [],
      model: {} as any,
      columns: [
        { key: 'bulan', text: 'Bulan', align: 'left' },
        { key: 'ansuran', text: 'Iuran SPP', align: 'center' },
        { key: 'potongan', text: 'Potongan', align: 'center' },
        { key: 'total', text: 'Total', align: 'center' },
        { key: 'tangalBayar', text: 'Tanggal Bayar', align: 'center' },
        { key: 'status', text: 'Status', align: 'center' },
        { key: 'action', text: '#', align: 'center' },
      ],
      rows: [],
      actionContent: [
        { id:'btn-bayar', kls: 'bg-primary', icon: 'fas fa-vote-yea', btnText:'Bayar' },
        // { id:'btn-print', kls: 'bg-warning', icon: 'fas fa-print', btnText: 'Print', disable: false }
      ] as any,
      topAction: [
        { id: 'ta2', text: 'Bayar yang Ceklis', action: 'bayar', color: "bg-primary-dark" },
      ],
      dataSiswa: {} as any,
      periode: null,
      listSpp: [] as any,
      tgl: dateFormatter('date', Date.now()),
      loading: false
    }
  },
  computed: {
    grandTotal() {
      let total = 0
      this.listSpp.forEach((item:any) => {
        total += item.total
      })
      return total
    },
    ...mapGetters(['loggedInUser'])
  },
  watch: {
    'model.id_periode'() {
      this.fetchSiswa()
    }
  },
  mounted() {
    this.initialize()
  },  
  methods: {
    async initialize() {
      // this.loading = true
      await this.fetchTa()
      await this.fetchSiswa()
      // this.loading = false
    },
    async fetchSiswa() {
      const params = { id_periode: this.model?.id_periode || null }
      const result = await this.usersService.request('siswa-aktif', params)
      if(result.code === 200) {
        const data = result.data
        this.listSiswa = data || null
      }
    },
    async fetchTa() {
      const _this = this as any
      const result = await this.masterService.request('list-ta')
      if(result.code === 200) {
        const data = result.data
        this.listTa = data
        this.model = {
          id_periode: _this.listTa[0]?.id || null
        }
      }
    },
    async handleSearch() {
      this.loading = true
      const data = {
        id_siswa: this.model?.id_siswa,
        params : { periode: this.model?.id_periode }
      }
      const theItem: any = this.listTa.find((item: any) => Number(item?.id || 0) === Number(this.model?.id_periode || 0))
      this.periode = theItem.tahunAjaran
      const result = await this.pembayaranService.request('spp-siswa', data)
      if(result.code === 200) {
        const data = result.data
        this.rows = data.dataSpp
        this.dataSiswa = data.dataSiswa
        this.loading = false
      }
    },
    handleButton(act:any, id:any, row:any) {
      console.log(id)
      if(act === 'btn-bayar') {
        const _this = this as any
        this.listSpp = [ row ]
        _this.$modal.show('modalPembayaran')
      }
    },
    handleActionTop(act: any, data: any) {
      if(act === 'bayar') {
        const _this = this as any
        this.listSpp = data
        _this.$modal.show('modalPembayaran')
      }
    },
    async totalSppOk() {
      let totalSpp = 0
      await this.listSpp.forEach((item:any) => {
        const numTot:any = formatterNumber(item.total)
        totalSpp += numTot
      })
      return totalSpp
    },
    async handleModal(menu:any) {
      this.loading = true
      const _this = this as any
      if (menu === 'submit') {
        const spp = await this.listSpp.map((item:any) => {
          return item.id
        })
        const totalSpp = await this.totalSppOk()
        const data = {
          bulan: spp,
          id_siswa: this.dataSiswa?.id,
          id_periode: this.model?.id_periode
        }
        const result = await this.pembayaranService.request('pembayaran', data)
        _this.$modal.hide('modalPembayaran')
        if(result.code === 200) {
          this.loading = false
          _this.$toast.success(result.message)
          const item = {
            phone: this.dataSiswa?.telpon || null,
            total: totalSpp,
            tanggal: this.tgl,
            nama: this.dataSiswa?.nama,
            kelas: this.dataSiswa?.namaKelas,
            nis: this.dataSiswa?.nis,
            petugas: this.loggedInUser.nama,
            bulan: spp.toString()
          }
          if(item.phone) {
            this.sendWa(item)
          }
          window.print()
          this.dataSiswa = {}
          this.rows = []
          _this.handleSearch()
        }
      }
    },
    sendWa(item:any) {
      const walink = 'https://web.whatsapp.com/send'

      const kirimWa = walink + '?phone=' + item?.phone + '&text=Kepada Yth. Orang Tua/Wali dari ananda ' + item?.nama + '%0A%0A' +
      'Pembayaran SPP Sejumlah Rp.' + item?.total + ' telah diterima dan diproses pada tanggal '+ item?.tanggal +' dengan rincian sebagai berikut:%0A%0A' +
      'Nama : ' + item?.nama + '%0A' +
      'NIS : ' + item?.nis + '%0A' +
      'Kelas : ' + item?.kelas + '%0A' +
      'Petugas : ' + item?.petugas + '%0A' +
      'Metode : SETOR TUNAI %0A' +
      'Untuk SPP Bulan : ( ' + item?.bulan + ' )%0A%0A' +
      'PESAN TEXT ini Dikirim OTOMATIS Oleh SYSTEM, Sebagai informasi terkait Pembayaran SPP'

      window.open(kirimWa)
    }
  }
})
</script>

<style>
@media print {
  #print {
    position:absolute !important;
    left:0 !important;
    top:0 !important;
  }
}
</style>