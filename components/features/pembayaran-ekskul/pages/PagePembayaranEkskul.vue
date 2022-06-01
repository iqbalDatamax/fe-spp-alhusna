<template>
  <div>
    <content-body title="Pembayaran Ektrakurikuler" icon="fas fa-cash-register">
      <form-ekskul :model="model" :ekskul="listEkskul" :siswa="listSiswa" :periode="listTa" @clickButton="handleCreateBayar" />
    </content-body>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { UsersService } from '~/systems/services/service-users'
import { MasterService } from '~/systems/services/service-master-data' 
import { PembayaranService } from '~/systems/services/services-pembayaran'

export default Vue.extend({
  components: {
    ContentBody: () => import('@/components/features/public/body-content/BodyContent.vue'),
    FormEkskul: () => import('@/components/features/pembayaran-ekskul/contents/FormEkskul.vue')
  },
  data() {
    return {
      usersService: new UsersService(this.$axios),
      masterService: new MasterService(this.$axios),
      pembayaranService: new PembayaranService(this.$axios),
      model: {} as any,
      listEkskul: [] as any,
      listSiswa: [] as any,
      listTa: [] as any
    }
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
      const _this = this as any
      const data = {
        id_periode: this.model?.id_priode,
        id_siswa: this.model?.id_siswa,
        id_ekskul: this.model?.ekskul,
        ansuran: this.model?.ansuran,
        deskripsi: this.model?.deskripsi
      }
      const result = await  this.pembayaranService.request('pembayaran-ekskul', data)
      if(result.code === 200 || result.code === 201) {
        _this.$toast.success(result.message)
        this.model = {}
      }
    }
  }
})
</script>