<template>
  <div>
    <content-body title="Laporan Pembayaran Ekstrakurikuler" icon="fas fa-file-signature">
      <card-filter v-model="model" :periode="listTa" :ekskuls="ekskul" :is-print="isPrint" @clickButton="handleClick" @clickPrint="handleDownload" />
      <div v-if="rows.length > 0">
        <div class="shadow p-2.5 border rounded mt-4">
          <div v-if="rows && rows.length > 0" id="print-body" class="overflow-x-auto pb-4">
            <card-kop-laporan />
            <div class="text-center text-h5 font-semibold border-t border-black pb-4">
              <p class="pt-2">Laporan Pembayaran Ektrakurikuler</p>
              <p class="">Tahun Ajaran {{ta}}</p>
              <p v-if="model.startDate && model.endDate" class="text-body">{{dateFormat(model.startDate)}} <span class="font-normal"> - </span> {{dateFormat(model.endDate)}}</p>
            </div>
            <table-checked :with-nomor="true" :columns="columns" :rows="rows"  />
            <card-footer :grand-total="grandTotal" :tgl-current="tgl" />
          </div>
        </div>
      </div>
      <div v-else class="my-6 p-4 shadow-sm border rounded-md">
        <p class="text-center text-black font-semibold text-sm">Data laporan tidak ditemukan, silahkan filter kembali</p>
      </div>
    </content-body>
    <q-loading class="print:hidden" :loading="loading" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PembayaranService } from '~/systems/services/services-pembayaran' 
import { MasterService } from '~/systems/services/service-master-data' 
import { dateFormatter, formatterNumber, formatterCurrency } from '@/systems/helpers/formatter'

export default Vue.extend({
  components: {
    ContentBody: () => import('@/components/features/public/body-content/BodyContent.vue'),
    CardFilter: () => import('@/components/features/laporan/contents/CardFilterEkskul.vue'),
    TableChecked: () => import('~/components/features/public/table/TableChecked.vue'),
    CardFooter: () => import('@/components/features/laporan/contents/CardFooter.vue'),
    CardKopLaporan: () => import('@/components/features/laporan/contents/CardKopLaporan.vue')
  },
  data() {
    return {
      masterService: new MasterService(this.$axios),
      pembayaranService: new PembayaranService(this.$axios),
      model: {
        status: 'lunas'
      } as any,
      listTa: [] as any,
      ekskul: [] as any,
      isPrint: false,
      ta: '',
      columns: [
        { key: 'namaSiswa', text: 'Nama Siswa', align: 'left' },
        { key: 'nisSiswa', text: 'NIS', align: 'center' },
        { key: 'ekskul', text: 'Ekskul', align: 'left' },
        { key: 'iuran', text: 'Iuran', align: 'center' },
        { key: 'deskripsi', text: 'Deskripsi', align: 'left' },
        { key: 'tanggalBayar', text: 'Tanggal Bayar', align: 'center' },
        { key: 'petugas', text: 'Petugas TU', align: 'left' }
      ],
      rows: [],
      tgl: dateFormatter('date', Date.now()),
      loading: false
    }
  },
  computed: {
    grandTotal() {
      let total = 0
      this.rows.forEach((item:any) => {
        const number = formatterNumber(item.iuran) || 0
        total += number
      })
      return formatterCurrency(total)
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize(){
      this.loading = true
      await this.fetchTa()
      this.fetchEkskul()
      this.handleClick()
      this.loading = false
    },
    async fetchTa() {
      const result = await this.masterService.request('list-ta')
      if(result.code === 200) {
        const data = result.data
        this.listTa = data
      }
    },
    async fetchEkskul() {
      const result = await this.masterService.request('list-ekskul')
      if(result.code === 200) {
        this.ekskul = result.data
      }
    },
    async handleClick() {
      this.loading = true
      const params = this.model
      const result = await this.pembayaranService.request('laporan-ekskul', params)
      if(result.code === 200) {
        const data = result.data
        this.rows = data
        this.loading = false
        if(this.rows.length > 0) {
          this.isPrint = true
        } else {
          this.isPrint = false
        }
      }
    },
    dateFormat(date: any){
      return dateFormatter('date', date)
    },
    handleDownload(): void {
      const JsPDF: any = (window as any).jspdf?.jsPDF || null
      const htmlToPdf: any = (window as any).html2pdf
      const body = document.querySelector('#print-body')

      if (!JsPDF || !body) return

      const options = {
        margin: 3,
        filename: `laporan-ekskul.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'p' }
      }
      htmlToPdf().set(options).from(body).save()
    },
  }
})
</script>