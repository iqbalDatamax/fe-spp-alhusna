<template>
  <div>
    <content-body title="Iuran Tahunan" icon="fas fa-cash-register" class="print:hidden">
      <card-search-siswa :periode="listTa" :list-siswa="listSiswa" :value="model" @clickButton="handleSearch" />
      <div v-if="dataSiswa.nama">
        <card-data-siswa :siswa="dataSiswa" />
        <card-iuran v-bind="dataIuran" v-model="iuran" @clickButton="handleButton" />
        <div v-if="rows && rows.length > 0" class="shadow p-2.5 border rounded mt-2.5">
          <div class="overflow-x-auto pb-4">
            <p class="text-black text-h5 font-semibold mb-2.5">History Pembayaran</p>
            <table-checked :columns="columns" :rows="rows" />
          </div>
        </div>
      </div>
      <div v-else class="my-6 p-4 shadow-sm border rounded-md">
        <p class="text-center text-black font-semibold text-sm">Input periode dan NIS atau Nama Siswa untuk mencari Iuran siswa ....</p>
      </div>
    </content-body>
    <div class="px-2 py-1 hidden print:block">
      <content-print :siswa="dataSiswa" :ta="periode" :data-iuran="dataIuran" :ansuran="numberFormat(iuran)" :tgl="tgl" />
    </div>
    <modal-review-bayar :siswa="dataSiswa" :ta="periode" :data-iuran="dataIuran" :ansuran="numberFormat(iuran)" :tgl="tgl" class="print:hidden" @clickModal="handleCreateIuran" />
    <q-loading class="print:hidden" :loading="loading" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { UsersService } from '~/systems/services/service-users'
import { MasterService } from '~/systems/services/service-master-data' 
import { PembayaranService } from '~/systems/services/services-pembayaran' 
import { dateFormatter, formatterCurrency, formatterNumber } from '@/systems/helpers/formatter'

export default Vue.extend({
  components: {
    ContentBody: () => import('@/components/features/public/body-content/BodyContent.vue'),
    CardSearchSiswa: () => import('@/components/features/pembayaran-spp/contents/CardSearchSiswa.vue'),
    CardDataSiswa: () => import('@/components/features/pembayaran-spp/contents/CardDataSiswa.vue'),
    TableChecked: () => import('~/components/features/public/table/TableChecked.vue'),
    CardIuran: () => import('@/components/features/iuran-tahunan/contents/CardIuran.vue'),
    ContentPrint: () => import('@/components/features/iuran-tahunan/contents/ContentPrint.vue'),
    ModalReviewBayar: () => import('@/components/features/iuran-tahunan/contents/ModalReviewBayar.vue'),
  },
  data() {
    return {
      usersService: new UsersService(this.$axios),
      masterService: new MasterService(this.$axios),
      pembayaranService: new PembayaranService(this.$axios),
      listSiswa: [],
      listTa: [],
      model: {} as any,
      dataSiswa: {} as any,
      dataIuran: {} as any,
      columns: [
        { key: 'iuran', text: 'Ansuran', align: 'center' },
        { key: 'tanggalBayar', text: 'Tanggal Bayar', align: 'center' },
      ],
      rows: [],
      periode: null,
      iuran: 0 as any,
      tgl: dateFormatter('date', Date.now()),
      loading: false
    }
  },
  computed: {
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
      const params = { id_periode: this.model?.id_periode }
      const result = await this.usersService.request('siswa-aktif', params)
      if(result.code === 200) {
        const data = result.data
        this.listSiswa = data
      }
    },
    async fetchTa() {
      const _this = this as any
      const result = await this.masterService.request('list-ta')
      if(result.code === 200) {
        const data = result.data
        this.listTa = data
        this.model = {
          id_periode: _this.listTa[0].id
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
      const result = await this.pembayaranService.request('iuran-siswa', data)
      if(result.code === 200) {
        const data = result.data
        this.dataSiswa = data.dataSiswa
        this.dataIuran = data.dataIuran
        this.cekHistoryPembayaran()
        this.iuran = null
      }
      this.loading = false
    },
    handleButton() {
      const _this = this as any
      const iuran = formatterNumber(this.iuran) || 0
      if(iuran > this.dataIuran?.sisaBayar) {
        _this.$toast.error('Inputan melebihi sisa pembayaran, mohon input dengan benar.')
      } else {
        _this.$modal.show('modalIuran')
      }
    },
    async handleCreateIuran() {
      this.loading = true
      const _this = this as any
      const data = {
        id_siswa: this.model?.id_siswa,
        id_periode: this.model?.id_periode,
        ansuran: formatterNumber(this.iuran)
      }
      const result = await this.pembayaranService.request('pembayaran-iuran', data)
      _this.$modal.hide('modalIuran')
      if(result.code === 200) {
        this.loading = false
        _this.$toast.success(result.message)
        const iuran = formatterNumber(this.iuran) || 0
        const item = {
          phone: this.dataSiswa?.telpon || null,
          total: formatterCurrency(this.iuran),
          tanggal: this.tgl,
          nama: this.dataSiswa?.nama,
          kelas: this.dataSiswa?.namaKelas,
          nis: this.dataSiswa?.nis,
          petugas: this.loggedInUser.nama,
          sisaBayar: formatterCurrency(this.dataIuran?.sisaBayar - iuran)
        }
        if(item.phone) {
          this.sendWa(item)
        }
        window.print()
        this.handleSearch()
      }
    },
    sendWa(item:any) {
      const walink = 'https://web.whatsapp.com/send'

      const kirimWa = walink + '?phone=' + item?.phone + '&text=Kepada Yth. Orang Tua/Wali dari ananda ' + item?.nama + '%0A%0A' +
      'Pembayaran IURAN Sejumlah Rp. ' + item?.total + ' telah diterima dan diproses pada tanggal '+ item?.tanggal +' dengan rincian sebagai berikut:%0A%0A' +
      'Nama : ' + item?.nama + '%0A' +
      'NIS : ' + item?.nis + '%0A' +
      'Kelas : ' + item?.kelas + '%0A' +
      'Petugas : ' + item?.petugas + '%0A' +
      'Metode : SETOR TUNAI %0A' +
      'Ansuran: Rp. ' + item.total + '%0A' +
      'Sisa Tunggakan: ' + item.sisaBayar + '%0A%0A' +
      'PESAN TEXT ini Dikirim OTOMATIS Oleh SYSTEM, Sebagai informasi terkait Pembayaran Sekolah'

      window.open(kirimWa)
    },
    async cekHistoryPembayaran() {
      const data = {
        id_siswa: this.model?.id_siswa,
        params : { id_periode: this.model?.id_periode }
      }
      const result = await this.pembayaranService.request('pembayaran-history', data)
      if(result.code === 200) {
        this.rows = result.data
      }
    },
    numberFormat(numb:any) {
      return formatterNumber(numb)
    }
  }
  
})
</script>