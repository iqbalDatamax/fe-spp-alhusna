<template>
  <div>
    <content-body title="Data Jenis Pembayaran" icon="fas fa-door-open">
      <button class="btn-primary my-4" @click="handleCreate"><i class="fas fa-plus mr-2"></i>Tambah Jenis Pembayaran</button>
      <div v-if="rows && rows.length > 0" class="overflow-x-auto pb-4">
        <table-checked :columns="columns" :rows="rows" :action-content="actionContent" @clickButton="handleAction" />
      </div>
      <div v-else class="my-6 p-4 shadow-sm border rounded-md">
        <p class="text-center text-danger font-semibold text-sm">Data tidak ditemukan....</p>
      </div>
    </content-body>
    <modal-ekskul :model="model" @clickModal="handleModalsubmit"  />
    <alert-information v-bind="bindAlert" @clickConfirm="handleConfirmAlert" />
    <q-loading class="print:hidden" :loading="loading" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MasterService } from '~/systems/services/service-master-data' 
import { UsersService } from '~/systems/services/service-users' 

export default Vue.extend({
  components: {
    ContentBody: () => import('@/components/features/public/body-content/BodyContent.vue'),
    TableChecked: () => import('~/components/features/public/table/TableChecked.vue'),
    ModalEkskul: () => import('@/components/features/master-data/contents/ModalEkskul.vue'),
  },
  data(){
    return {
      masterService: new MasterService(this.$axios),
      usersService: new UsersService(this.$axios),
      columns: [
        { key: 'namaEkskul', text: 'Jenis Pembayaran', align: 'left' },
        { key: 'deskripsi', text: 'Deskripsi', align: 'left' },
        { key: 'action', text: '#', align: 'center' },
      ],
      rows: [],
      actionContent: [
        { id:'btn-edit', kls: 'bg-warning', icon: 'fas fa-pen' },
        { id:'btn-delete', kls: 'bg-danger', icon: 'fas fa-trash' }
        // { id:'btn-view', kls: 'bg-success', icon: 'fas fa-eye' }
      ],
      model: {} as any,
      bindAlert: {} as any,
      loading: false
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize() {
      this.loading = true
      const result = await this.masterService.request('list-ekskul')
      if(result.code === 200) {
        this.rows = result.data
        this.loading = false
      }
    },
    handleCreate(){
      (this as any).$modal.show('modalEkskul')
      this.model = {}
    },
    async handleAction(menu:any, id: any){
      this.loading = true
      const _this = this as any
      if (menu === 'btn-edit'){
        const result = await this.masterService.request('get-ekskul', id)
        if(result.code === 200) {
          const data = result.data
          _this.model = {
            id: data.id,
            nama_ekskul: data.namaEkskul,
            description: data.deskripsi,
            edit: true 
          }
          _this.$modal.show('modalEkskul')
          this.loading = false
        }
      } else if (menu === 'btn-delete') {
        this.bindAlert = { title: 'Hapus Ekskul', text: 'Yakin menghapus data ini?', type: 'confirm', id, act: 'delete' }
        _this.$modal.show('alertModal')
      }
    },
    async handleConfirmAlert(id:any, act:string){
      this.loading = true
      const _this = this as any
      if (act === 'delete') {
        const result = await this.masterService.request('delete-ekskul', id)
        if(result.code === 201) {
          _this.initialize()
          _this.$toast.success(result.message)
          _this.$modal.hide('alertModal')
          this.loading = false
        } else {
          _this.$toast.error(result.message)
        }
      }
    },
    async handleModalsubmit() {
      this.loading = true
      const _this = this as any
      let result: any = {}
      if(!this.model?.edit) {
        result = await this.masterService.request('create-ekskul', this.model)
      } else {
        result = await this.masterService.request('update-ekskul', this.model)
      }

      if(result.code === 200 || result.code === 201) {
        _this.initialize()
        this.loading = false
        _this.$toast.success(result.message)
        _this.$modal.hide('modalEkskul')
      } else {
        _this.$toast.error(result.message)
      }
    }
  }
})
</script>
