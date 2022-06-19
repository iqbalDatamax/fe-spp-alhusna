<template>
  <div>
    <content-body title="Pembayaran Ektrakurikuler / Lainnya" icon="fas fa-cash-register" class="print:hidden">
      <form-ekskul :model="model" :ekskul="listEkskul" :siswa="listSiswa" :periode="listTa" @clickButton="handleCreateBayar" />
    </content-body>
    <div class="px-2 py-1 hidden print:block">
      <content-print :siswa="dataSiswa" :ta="periode" :keterangan="keterangan" :ansuran="numberFormat(model.ansuran)" :tgl="tgl" />
    </div>
    <modal-review-bayar :siswa="dataSiswa" :ta="periode" :keterangan="keterangan" :ansuran="numberFormat(model.ansuran)" :tgl="tgl" class="print:hidden" @clickModal="handleSubmit" />
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
    FormEkskul: () => import('@/components/features/pembayaran-ekskul/contents/FormEkskul.vue'),
    ContentPrint: () => import('@/components/features/pembayaran-ekskul/contents/ContentPrint.vue'),
    ModalReviewBayar: () => import('@/components/features/pembayaran-ekskul/contents/ModalReviewBayar.vue'),
  },
  data() {
    return {
      usersService: new UsersService(this.$axios),
      masterService: new MasterService(this.$axios),
      pembayaranService: new PembayaranService(this.$axios),
      model: {} as any,
      listEkskul: [] as any,
      listSiswa: [] as any,
      listTa: [] as any,
      dataSiswa: {} as any,
      tgl: dateFormatter('date', Date.now()),
      periode: null,
      keterangan: null,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  mounted() {
    this.initialized()
  },
  methods: {
    async initialized() {
      await this.fetchTa()
      await this.fetchSiswa()
      this.fetchEkskul()
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
    async fetchSiswa() {
      const params = { id_periode: this.model?.id_periode }
      const result = await this.usersService.request('siswa-aktif', params)
      if(result.code === 200) {
        const data = result.data
        this.listSiswa = data
      }
    },
    async fetchEkskul() {
      const result = await this.masterService.request('list-ekskul')
      if(result.code === 200) {
        const data = result.data
        this.listEkskul = data
      }
    },
    async handleCreateBayar() {
      this.loading = true
      const _this = this as any
      const params = this.model?.id_siswa
      const theItem: any = this.listTa.find((item: any) => Number(item?.id || 0) === Number(this.model?.id_periode || 0))
      this.periode = theItem.tahunAjaran
      const itemEkskul: any = this.listEkskul.find((item: any) => Number(item?.id || 0) === Number(this.model?.ekskul || 0))
      this.keterangan = itemEkskul.namaEkskul
      const result = await _this.usersService.request('get-user', params, 'siswa')
      if(result.code === 200) {
        const data = result.data
        this.dataSiswa = data
        this.loading = false
      }
      _this.$modal.show('modalBayarEkskul')
    },
    async handleSubmit() {
      this.loading = true
      const _this = this as any
      const data = {
        id_periode: this.model?.id_periode,
        id_siswa: this.model?.id_siswa,
        id_ekskul: this.model?.ekskul,
        ansuran: formatterNumber(this.model?.ansuran) || null,
        deskripsi: this.model?.deskripsi || null
      }
      const result = await  this.pembayaranService.request('pembayaran-ekskul', data)
      _this.$modal.hide('modalBayarEkskul')
      if(result.code === 200 || result.code === 201) {
        _this.$toast.success(result.message)
        const item = {
          phone: this.dataSiswa?.telpon || null,
          total: this.model?.ansuran,
          tanggal: this.tgl,
          nama: this.dataSiswa?.nama,
          nis: this.dataSiswa?.nis,
          petugas: this.loggedInUser.nama,
          keterangan: this.keterangan
        }
        if(item.phone) {
          this.sendWa(item)
        }
        window.print()
        this.model = {}
        this.loading = false
      }
    },
    sendWa(item:any) {
      const walink = 'https://web.whatsapp.com/send'

      const kirimWa = walink + '?phone=' + item?.phone + '&text=Kepada Yth. Orang Tua/Wali dari ananda ' + item?.nama + '%0A%0A' +
      'Pembayaran Sejumlah Rp. ' + item?.total + ' telah diterima dan diproses pada tanggal '+ item?.tanggal +' dengan rincian sebagai berikut:%0A%0A' +
      'Nama : ' + item?.nama + '%0A' +
      'NIS : ' + item?.nis + '%0A' +
      'Petugas : ' + item?.petugas + '%0A' +
      'Metode : SETOR TUNAI %0A' +
      'Keterangan : '+ item?.keterangan + '%0A' +
      'Ansuran: Rp. ' + item.total + '%0A%0A' +

      'PESAN TEXT ini Dikirim OTOMATIS Oleh SYSTEM, Sebagai informasi terkait Pembayaran Sekolah'

      window.open(kirimWa)
    },
    numberFormat(numb:any) {
      return formatterNumber(numb)
    }
  }
})
</script>