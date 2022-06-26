<template>
  <div>
    <content-body title="Tahun Ajaran & Atur IURAN Per Kelas" icon="fas fa-calendar-alt">
      <button class="btn-primary mb-4" @click="handleCreate()"><i class="fas fa-plus mr-2"></i>Tahun Ajaran Baru</button>
      <div v-if="periode" class="flex flex-col">
        <p class="mr-2 text-lg text-primary-dark font-medium mb-3">Tahun Ajaran {{ periode.tahunAjaran }} <i class="fas fa-pen text-black ml-1.5" @click="handleEdit(periode.id)"></i></p>
        <card-ta-iuran :lists="iuranList" @buttonEdit="handleEditIuran" />
      </div>
    </content-body>
    <modal-ta v-model="model.tahun_ajaran" :edit="model.edit" @clickModal="handleModalSubmit" />
    <modal-iuran v-model="iuranModel" :items="iuranList" @clickModal="handleModalSubmit" />
    <q-loading class="print:hidden" :loading="loading" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MasterService } from '~/systems/services/service-master-data' 
import { formatterNumber, formatterCurrency } from '@/systems/helpers/formatter'

export default Vue.extend({
  components: {
    ContentBody: () => import('@/components/features/public/body-content/BodyContent.vue'),
    ModalTa: () => import('@/components/features/master-data/contents/ModalTa.vue'),
    CardTaIuran: () => import('@/components/features/master-data/contents/CardTaIuran.vue'),
    ModalIuran: () => import('@/components/features/master-data/contents/ModalIuran.vue')
  },
  data() {
    return {
      masterService: new MasterService(this.$axios),
      columns: [
        { key: 'tahunAjaran', text: 'Tahun Ajaran', align: 'center' },
        { key: 'action', text: '#', align: 'center' },
      ],
      rows: [],
      actionContent: [
        { id:'edit-ta', kls: 'bg-warning', icon: 'fas fa-pen' }
      ],
      model: {} as any,
      periode: {} as any,
      iuranList: [] as any,
      iuranModel: {} as any,
      loading: false
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize() {
      // this.loading = true
      await this.fetchTa()
      await this.fetchPeriodeIuran()
      // this.loading = false
    },
    async fetchTa() {
      const result = await this.masterService.request('list-ta')
      if(result.code === 200) {
        const data = result.data
        this.periode = data[0]
      }
    },
    async fetchPeriodeIuran() {
      const params = { periode: this.periode?.id }
      const result = await this.masterService.request('list-iuran', params)
      if(result.code === 200) {
        const data = result.data
        this.iuranList = data
      }
    },
    async handleEditIuran(id: any) {
      this.loading = true
      const _this = this as any
      const result = await this.masterService.request('get-iuran', id)
      if(result.code === 200) {
        const data = result.data
        this.iuranModel = {
          id: data?.id || null,
          namaKelas: data?.namaKelas || null,
          iuran_spp: formatterCurrency(data?.iuranSpp) || null,
          iuran_tahunan: formatterCurrency(data?.iuranTahunan) || null,
          id_periode: data?.idPeriode || null,
          id_kelas: data?.idKelas || null,
          cAt: data.cAt || null,
          uAt: data.uAt || null
        }
        _this.$modal.show('modalIuran')
        this.loading = false
      }
    },
    async handleModalSubmit(menu: any) {
      this.loading = true
      const _this = this as any
      if(menu === "iuran") {
        const data = {
          id: this.iuranModel?.id || null,
          iuran_spp: formatterNumber(this.iuranModel?.iuran_spp) || null,
          iuran_tahunan: formatterNumber(this.iuranModel?.iuran_tahunan) || null,
          id_periode: this.iuranModel?.id_periode || null,
          id_kelas: this.iuranModel?.id_kelas || null
        }
        const result = await this.masterService.request('update-iuran', data)
        if(result.code === 201) {
          _this.$toast.success(result.message)
          _this.$modal.hide('modalIuran')
          _this.initialize()
          this.loading = false
        }
      } else {
        const result = await this.masterService.request(this.model?.edit ? 'update-ta':'create-ta', this.model)
        if(result.code === 201) {
          _this.$modal.hide('modalTa')
          this.initialize()
          _this.$toast.success(result.message)
          this.model = {}
          this.loading = false
        } else {
          _this.$toast.error(result.message)
        }
      }
    },
    handleCreate() {
      const _this = this as any
      this.model = {}
      _this.$modal.show('modalTa')
    },
    async handleEdit(id: any) {
      this.loading = true
      const _this = this as any
      _this.$modal.show('modalTa')
      const result = await this.masterService.request('get-ta', id)
      if(result.code === 200) {
        const data = result.data
        _this.model = {
          id: data.id,
          tahun_ajaran: data.tahunAjaran,
          edit: true 
        }
        this.loading = false
      }
    }
  }
})
</script>