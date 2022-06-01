<template>
  <div>
    <content-body title="data admin" icon="fas fa-chalkboard-teacher">
      <card-filter-table v-model="filter" @clickButton="handleCreate" @changeSelect="perPageChange" @eventChange="handleSearch" />
      <div v-if="rows && rows.length > 0" class="overflow-x-auto pb-4">
        <table-checked :columns="columns" :rows="rows" :action-content="actionContent" @clickButton="handleAction" />
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
    CardFilterTable: () => import('@/components/features/admin/list-admin/contents/CardFilterTable.vue'),
    ModalForm: () => import('@/components/features/admin/list-admin/contents/ModalForm.vue'),
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
        { key: 'peran', text: 'Peran', align: 'center' },
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
      model: {} as any
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize(params?:any) {
      const param = params || { page: this.page, limit: this.perPage }
      const result = await this.usersService.request('list-admin', param)
      if(result.code === 200) {
        const data = result.data
        this.totalItems = data.totalItems
        this.rows = data.dataAdmin
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
      const _this = this as any
      if(menu === 'btn-delete'){
        this.bindAlert = { title: 'Hapus Admin', text: 'Yakin menghapus data ini?', type: 'confirm', id, act: 'delete' }
        _this.$modal.show('alertModal')
      } else if (menu === 'btn-edit'){
        const result = await this.usersService.request('get-user', id)
        if(result.code === 200) {
          _this.model = Object.assign (result.data, {edit: true})
          _this.$modal.show('modalFormAdmin')
        }
      }
    },
    async handleConfirmAlert(id:any, act:string){
      const _this = this as any
      if (act === 'delete') {
        const result = await this.usersService.request('delete-user', id)
        if(result.code === 201) {
          _this.initialize()
          _this.$toast.success(result.message)
          _this.$modal.hide('alertModal')
        } else {
          _this.$toast.error(result.message)
        }
      }
    },
    handleCreate(){
      (this as any).$modal.show('modalFormAdmin')
      this.model = {}
    },
    async handleModalsubmit() {
      const _this = this as any
      let result: any = {}
      if(!this.model?.edit) {
        if(this.model.password !== this.model.confirmPassword){
          _this.$toast.error('Password yang anda masukkan tidak sama')
          return
        }
        result = await this.usersService.request('create-user', this.model)
      } else {
        result = await this.usersService.request('edit-user', this.model)
      }

      if(result.code === 200 || result.code === 201) {
        _this.initialize()
        _this.$toast.success(result.message)
        _this.$modal.hide('modalFormAdmin')
      } else {
        _this.$toast.error(result.message)
      }
    }
  }
})
</script>