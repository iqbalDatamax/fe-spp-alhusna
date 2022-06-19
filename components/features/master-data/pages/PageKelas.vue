<template>
  <div>
    <content-body title="Data Kelas" icon="fas fa-door-open">
      <button class="btn-primary my-4" @click="handleCreate"><i class="fas fa-plus mr-2"></i>Tambah Kelas</button>
      <div v-if="rows && rows.length > 0" class="overflow-x-auto pb-4">
        <table-checked :columns="columns" :with-nomor="true" :rows="rows" :action-content="actionContent" @clickButton="handleAction" />
      </div>
      <div v-else class="my-6 p-4 shadow-sm border rounded-md">
        <p class="text-center text-danger font-semibold text-sm">Data tidak ditemukan....</p>
      </div>
    </content-body>
    <q-loading class="print:hidden" :loading="loading" />
    <modal-kelas :model="model" :angkatan="angkatan" :user="user" @clickModal="handleModalsubmit"  />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MasterService } from '~/systems/services/service-master-data' 

export default Vue.extend({
  components: {
    ContentBody: () => import('@/components/features/public/body-content/BodyContent.vue'),
    TableChecked: () => import('~/components/features/public/table/TableChecked.vue'),
    ModalKelas: () => import('@/components/features/master-data/contents/ModalKelas.vue'),
  },
  data(){
    return {
      masterService: new MasterService(this.$axios),
      columns: [
        { key: 'namaKelas', text: 'Nama Kelas', align: 'left' },
        { key: 'status', text: 'Status', align: 'center' },
        { key: 'action', text: '#', align: 'center' },
      ],
      rows: [],
      actionContent: [
        { id:'btn-edit', kls: 'bg-warning', icon: 'fas fa-pen' }
      ],
      model: {} as any,
      angkatan: [],
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
      const result = await this.masterService.request('list-kelas')
      if(result.code === 200) {
        this.rows = result.data
        this.loading = false
      }
    },
    handleCreate(){
      (this as any).$modal.show('modalKelas')
      this.model = {}
    },
    async handleAction(menu:any, id: any){
      this.loading = true
      const _this = this as any
      if (menu === 'btn-edit'){
        const result = await this.masterService.request('get-kelas', id)
        if(result.code === 200) {
          const data = result.data
          _this.model = {
            id: data.id || null,
            nama_kelas: data.namaKelas || null,
            status: data.status || null,
            edit: true 
          }
          _this.$modal.show('modalKelas')
          this.loading = false
        }
      }
    },
    async handleModalsubmit() {
      this.loading = true
      const _this = this as any
      let result: any = {}
      if(!this.model?.edit) {
        result = await this.masterService.request('create-kelas', this.model)
      } else {
        result = await this.masterService.request('update-kelas', this.model)
      }

      if(result.code === 200 || result.code === 201) {
        _this.initialize()
        _this.$toast.success(result.message)
        _this.$modal.hide('modalKelas')
        this.loading = false
      } else {
        _this.$toast.error(result.message)
      }
    }
  }
})
</script>
