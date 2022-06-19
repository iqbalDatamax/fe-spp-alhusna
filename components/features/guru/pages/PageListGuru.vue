<template>
  <div>
    <content-body title="data guru" icon="fas fa-user-tie">
      <card-filter-table v-model="filter" @clickButton="handleCreate" @changeSelect="perPageChange" @eventChange="handleSearch" />
      <div v-if="rows && rows.length > 0" class="overflow-x-auto pb-4">
        <table-checked :columns="columns" :rows="rows" :action-content="actionContent" @clickButton="handleAction" />
      </div>
      <div v-else class="my-6 p-4 shadow-sm border rounded-md">
        <p class="text-center text-danger font-semibold text-sm">Data tidak ditemukan....</p>
      </div>
      <div class="mt-4 lg:px-3">
        <vue-ads-pagination
          :total-items="totalItems"
          :max-visible-pages="5"
          :page="page"
          :items-per-page="perPage"
          @page-change="pageChange"
        >
        </vue-ads-pagination>
      </div>
    </content-body>
    <alert-information v-bind="bindAlert" @clickConfirm="handleConfirmAlert" />
    <modal-form :model="model" @clickModal="handleModalsubmit" />
    <q-loading class="print:hidden" :loading="loading" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueAdsPagination from 'vue-ads-pagination';
import { UsersService } from '~/systems/services/service-users' 
import { debounce } from '@/systems/helpers/common'

export default Vue.extend({
  components: {
    ContentBody: () => import('@/components/features/public/body-content/BodyContent.vue'),
    TableChecked: () => import('~/components/features/public/table/TableChecked.vue'),
    CardFilterTable: () => import('@/components/features/guru/contents/CardFilterTable.vue'),
    ModalForm: () => import('@/components/features/guru/contents/ModalForm.vue'),
    VueAdsPagination
  },
  data() {
    return {
      usersService: new UsersService(this.$axios),
      filter: {
        perPage: 10
      } as any,
      perPage: 10,
      totalItems: 0,
      page: 0,
      bindAlert: {} as any,
      columns: [
        { key: 'nama', text: 'Nama', align: 'left' },
        { key: 'email', text: 'Email', align: 'left' },
        { key: 'jenis_kelamin', text: 'JK', align: 'center' },
        { key: 'telpon', text: 'No Telpon', align: 'center' },
        { key: 'status', text: 'Status', align: 'center' },
        { key: 'terdaftar', text: 'Terdaftar', align: 'center' },
        { key: 'action', text: '#', align: 'center' },
      ],
      rows: [],
      actionContent: [
        { id:'btn-delete', kls: 'bg-danger', icon: 'fas fa-trash-alt' },
        { id:'btn-edit', kls: 'bg-warning', icon: 'fas fa-pen' }
      ],
      keyTable: 'keyTable',
      model: {} as any,
      loading: false
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize(params?:any) {
      this.loading = true
      const param = params || { page: this.page, limit: this.perPage }
      const result = await this.usersService.request('list-guru', param)
      if(result.code === 200) {
        const data = result.data
        this.totalItems = data.totalItems
        this.rows = data.dataGuru
        this.loading = false
      }
    },
    pageChange(page:any) {
      this.page = page;
      const params = { page: this.page, limit: this.perPage }
      this.initialize(params)
    },
    perPageChange() {
      this.perPage = this.filter?.perPage
      const params = { page: this.page, limit: this.perPage }
      this.initialize(params)
    },
    handleSearch() {
      debounce(() => {
				const params = { page: this.page, limit: this.perPage, nama: this.filter.search }
				this.initialize(params)
			}, 500)()
    },
    async handleAction(menu:any, id: any){
      this.loading = true
      const _this = this as any
      if(menu === 'btn-delete'){
        this.bindAlert = { title: 'Hapus Guru', text: 'Yakin menghapus data ini?', type: 'confirm', id, act: 'delete' }
        _this.$modal.show('alertModal')
        this.loading = false
      } else if (menu === 'btn-edit'){
        const result = await this.usersService.request('get-user', id)
        if(result.code === 200) {
          _this.model = Object.assign (result.data, {edit: true})
          _this.$modal.show('modalFormGuru')
          this.loading = false
        }
      }
    },
    async handleConfirmAlert(id:any, act:string){
      this.loading = true
      const _this = this as any
      if (act === 'delete') {
        const result = await this.usersService.request('delete-user', id)
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
    handleCreate(){
      (this as any).$modal.show('modalFormGuru')
      this.model = {}
    },
    async handleModalsubmit() {
      this.loading = true
      const _this = this as any
      let result: any = {}
      if(!this.model?.edit) {
        if(this.model.password !== this.model.confirmPassword){
          _this.$toast.error('Password yang anda masukkan tidak sama')
          return
        }
        const data = await Object.assign(this.model, {peran: 'guru'})
        result = await this.usersService.request('create-user', data)
        this.loading = false
      } else {
        result = await this.usersService.request('edit-user', this.model)
      }

      if(result.code === 200 || result.code === 201) {
        _this.initialize()
        _this.$toast.success(result.message)
        _this.$modal.hide('modalFormGuru')
      } else {
        _this.$toast.error(result.message)
      }
    }
  }
})
</script>