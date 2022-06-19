<template>
  <div>
    <content-body title="Data Penerima Beasiswa" icon="fas fa-medal">
      <button class="btn-primary my-4" @click="handleCreate"><i class="fas fa-plus mr-2"></i>Tambah Penerima</button>
      <div v-if="rows && rows.length > 0" class="overflow-x-auto pb-4">
        <table-checked :columns="columns" :rows="rows" :action-content="actionContent" @clickButton="handleAction" />
      </div>
      <div v-else class="my-6 p-4 shadow-sm border rounded-md">
        <p class="text-center text-danger font-semibold text-sm">Data tidak ditemukan....</p>
      </div>
    </content-body>
    <modal-beasiswa :model="model" :periode="listTa" :user="user" @clickModal="handleModalsubmit"  />
    <q-loading class="print:hidden" :loading="loading" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MasterService } from '~/systems/services/service-master-data' 
import { UsersService } from '~/systems/services/service-users' 
import { formatterCurrency, formatterNumber } from '@/systems/helpers/formatter'

export default Vue.extend({
  components: {
    ContentBody: () => import('@/components/features/public/body-content/BodyContent.vue'),
    TableChecked: () => import('~/components/features/public/table/TableChecked.vue'),
    ModalBeasiswa: () => import('@/components/features/master-data/contents/ModalBeasiswa.vue'),
  },
  data(){
    return {
      masterService: new MasterService(this.$axios),
      usersService: new UsersService(this.$axios),
      columns: [
        { key: 'namaSiswa', text: 'Nama Siswa', align: 'left' },
        { key: 'nis', text: 'NIS', align: 'center' },
        { key: 'tahunAjaran', text: 'Tahun Ajaran', align: 'center' },
        { key: 'potonganSpp', text: 'Potongan SPP', align: 'center' },
        { key: 'potonganIuran', text: 'Potongan Iuran', align: 'center' },
        { key: 'action', text: '#', align: 'center' },
      ],
      rows: [],
      actionContent: [
        { id:'btn-edit', kls: 'bg-warning', icon: 'fas fa-pen' },
        // { id:'btn-view', kls: 'bg-success', icon: 'fas fa-eye' }
      ],
      model: {} as any,
      listTa: [],
      user: [],
      loading: false
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize() {
      this.loading = true
      await this.fetchTa()
      this.fetchSiswa()
      const result = await this.masterService.request('list-beasiswa')
      if(result.code === 200) {
        this.rows = result.data
        this.loading = false
      }
    },
    async fetchSiswa() {
      const params = { id_periode: this.model?.id_periode }
      const result = await this.usersService.request('siswa-aktif', params)
      if(result.code === 200) {
        const data = result.data
        this.user = data
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
    handleCreate(){
      const _this = this as any
      _this.$modal.show('modalBeasiswa')
      this.model = {
        id_periode: _this.listTa[0].id
      }
    },
    async handleAction(menu:any, id: any){
      this.loading = true
      const _this = this as any
      if (menu === 'btn-edit'){
        const result = await this.masterService.request('get-beasiswa', id)
        if(result.code === 200) {
          const data = result.data
          _this.model = {
            id: data.id,
            potongan_spp: formatterCurrency(data.potonganSpp) || 0,
            potongan_iuran: formatterCurrency(data.potonganIuran) || 0,
            id_siswa: data.idSiswa,
            id_periode: data.idPeriode,
            edit: true 
          }
          _this.$modal.show('modalBeasiswa')
          this.loading = false
        }
      }
    },
    async handleModalsubmit() {
      this.loading = true
      const _this = this as any
      const data = {
        id: this.model.id || null,
        potongan_spp: formatterNumber(this.model.potongan_spp) || 0,
        potongan_iuran: formatterNumber(this.model.potongan_iuran) || 0,
        id_siswa: this.model.id_siswa,
        id_periode: this.model.id_periode,
        edit: this.model.edit || false 
      }
      let result: any = {}
      if(!this.model?.edit) {
        result = await this.masterService.request('create-beasiswa', data)
      } else {
        result = await this.masterService.request('update-beasiswa', data)
      }

      if(result.code === 200 || result.code === 201) {
        _this.initialize()
        this.loading = false
        _this.$toast.success(result.message)
        _this.$modal.hide('modalBeasiswa')
      } else {
        _this.$toast.error(result.message)
      }
    }
  }
})
</script>
