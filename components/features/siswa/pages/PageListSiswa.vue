<template>
  <div>
    <content-body title="data siswa" icon="fas fa-users">
      <card-filter-table v-model="filter" :periode="listTa" :item-kelas="listKelas" @clickButton="handleCreate" @changeSelect="FilterPage" @eventChange="handleSearch" />
      <div v-if="rows && rows.length > 0" class="overflow-x-auto pb-4">
        <table-checked :with-check="true" :columns="columns" :rows="rows" :top-action="topAction" :action-content="actionContent" @clickButton="handleAction" @clickActionTop="handleActionTop" />
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
    <modal-kelas  v-model="idKp" :item-kelas="listKelas" @clickModal="handleModalsubmit" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueAdsPagination from 'vue-ads-pagination';
import { UsersService } from '~/systems/services/service-users' 
import { MasterService } from '~/systems/services/service-master-data' 
import { debounce } from '@/systems/helpers/common'

export default Vue.extend({
  components: {
    ContentBody: () => import('@/components/features/public/body-content/BodyContent.vue'),
    TableChecked: () => import('~/components/features/public/table/TableChecked.vue'),
    CardFilterTable: () => import('@/components/features/siswa/contents/CardFilterTable.vue'),
    ModalKelas: () => import('@/components/features/siswa/contents/ModalPilihKelas.vue'),
    VueAdsPagination
  },
  data() {
    return {
      usersService: new UsersService(this.$axios),
      masterService: new MasterService(this.$axios),
      filter: {
        perPage: 10,
        idKelas: ''
      } as any,
      perPage: 10,
      totalItems: 0,
      page: 0,
      bindAlert: {} as any,
      columns: [
        { key: 'nama', text: 'Nama', align: 'left' },
        { key: 'nis', text: 'NIS', align: 'left' },
        { key: 'jk', text: 'JK', align: 'center' },
        { key: 'ttl', text: 'TTL', align: 'center' },
        { key: 'namaKelas', text: 'Kelas', align: 'center'},
        { key: 'status', text: 'Status', align: 'center' },
        { key: 'terdaftar', text: 'Terdaftar', align: 'center' },
        { key: 'action', text: '#', align: 'center' },
      ],
      rows: [],
      actionContent: [
        { id:'btn-delete', kls: 'bg-danger', icon: 'fas fa-trash-alt' },
        { id:'btn-edit', kls: 'bg-warning', icon: 'fas fa-pen' }
      ],
      topAction: [
        { id: 'ta1', text: 'Atur Kelas', action: 'atur', color: 'bg-primary' },
        { id: 'ta2', text: 'Siswa Lulus', action: 'lulus', color: 'bg-danger' }
      ],
      keyTable: 'keyTable',
      model: {} as any,
      listKelas: [] as any,
      listTa: [] as any,
      dataCheckeed: [] as any,
      idKp: 0
    }
  },
  watch: {
    'filter.id_peeriod'(){
      this.fetchPeriodeIuran()
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize(params?:any) {
      await this.fetchTa()
      this.fetchPeriodeIuran()
      const param = params || { page: this.page, limit: this.perPage }
      const result = await this.usersService.request('list-siswa', param)
      if(result.code === 200) {
        const data = result.data
        this.totalItems = data.totalItems
        this.rows = data.dataSiswa
      }
    },
    async fetchTa() {
      const result = await this.masterService.request('list-ta')
      if(result.code === 200) {
        const data = result.data
        this.listTa = data
        this.filter.id_periode = data[0].id
      }
    },
    async fetchPeriodeIuran() {
      const params = { periode:this.filter.id_periode }
      const result = await this.masterService.request('list-iuran', params)
      if(result.code === 200) {
        const data = result.data
        this.listKelas = data
      }
    },
    pageChange(page:any) {
      this.page = page;
      const params = { page: this.page, limit: this.perPage }
      this.initialize(params)
    },
    FilterPage(menu: any) {
      if(menu === 'kelas') {
        this.perPage = 50
        const params = { page: this.page, limit: this.perPage, id_kelas: this.filter?.idKelas }
        this.initialize(params)
      } else {
        this.perPage = this.filter?.perPage
        const params = { page: this.page, limit: this.perPage, id_kelas: this.filter?.idKelas }
        this.initialize(params)
      }
    },
    handleSearch() {
      debounce(() => {
				const params = { page: this.page, limit: this.perPage, nama: this.filter.search }
				this.initialize(params)
			}, 500)()
    },
    handleAction(menu:any, id: any){
      const _this = this as any
      if(menu === 'btn-delete'){
        this.bindAlert = { title: 'Hapus Siswa', text: 'Yakin menghapus data ini?', type: 'confirm', id, act: 'delete' }
        _this.$modal.show('alertModal')
      } else if (menu === 'btn-edit'){
        this.$router.push(`/siswa/${id}`)
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
      } else {
        const data = {
          dataSiswa: this.dataCheckeed
        }
        const result = await this.usersService.request('siswa-lulus', data)
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
      this.$router.push('/siswa/create')
    },
    async handleActionTop(act: any, data: any){
      const dt = await data.map((item: any) => {
        return {
          id_siswa: item.id
        }
      })
      this.dataCheckeed = dt
      const _this = this as any
      if(act === 'atur') {
        _this.$modal.show('modalPilihKelas')
      } else if (act === 'lulus') {
        this.bindAlert = { title: 'Siswa Lulus?', text: 'Apakah yakin untuk mengupdate status siswa yang terpilih?', type: 'confirm', id: 1, act: 'lulus' }
        _this.$modal.show('alertModal')
      }
    },
    async handleModalsubmit(menu: any) {
      const _this = this as any
      if(menu === 'atur-kelas') {
        const data = {
          id_kp: this.idKp,
          dataSiswa: this.dataCheckeed
        }
        const result = await this.usersService.request('atur-kelas', data)
        if(result.code === 200) {
          _this.initialize()
          _this.$toast.success(result.message)
          _this.$modal.hide('modalPilihKelas')
        } else {
          _this.$toast.error(result.message)
        }
      }
    }
  }
})
</script>