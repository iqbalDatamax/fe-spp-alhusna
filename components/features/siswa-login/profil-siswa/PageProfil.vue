<template>
  <div>
    <div class="flex flex-row gap-3 items-center p-4 border-b shadow">
      <i class="fas fa-chevron-left text-xl text-black cursor-pointer" @click="$router.back()"></i>
      <p class="text-primary-dark font-medium text-sm capitalize">MY Profile</p>
    </div>
    <div class="p-4 flex flex-col">
      <div class="flex my-8 justify-center">
        <img :src="`${$axios.defaults.baseURL}/${dataSiswa.photo}`" alt="photo siswa" class="h-[110px] rounded-full border" @error="setDefaultImage">
      </div>
      <div class="divide-y divide-black-light capitalize">
        <div class="flex justify-between py-1">
          <p class="text-sm text-black">Status</p>
          <p class="text-xs px-2 py-1 font-semibold rounded-full capitalize" :class="dataSiswa.status !== 'aktif' ? 'bg-danger-light text-danger-dark' : 'bg-primary-light text-primary-dark'">{{dataSiswa.status}}</p>
        </div>
        <div class="flex justify-between py-2">
          <p class="text-black text-sm">Terdaftar</p>
          <p class="text-sm text-primary-dark">{{dataSiswa.terdaftar}}</p>
        </div>
        <div class="flex justify-between py-2">
          <p class="text-black text-sm">Nama</p>
          <p class="text-sm text-primary-dark">{{dataSiswa.nama}}</p>
        </div>
        <div class="flex justify-between py-2">
          <p class="text-black text-sm">NIS</p>
          <p class="text-sm text-primary-dark">{{dataSiswa.nis}}</p>
        </div>
        <div class="flex justify-between py-2">
          <p class="text-black text-sm">TTL</p>
          <p class="text-sm text-primary-dark">{{dataSiswa.ttl}}</p>
        </div>
        <div class="flex justify-between py-2">
          <p class="text-black text-sm">Jenis Kelamin</p>
          <p class="text-sm text-primary-dark">{{dataSiswa.jk}}</p>
        </div>
        <div class="flex justify-between py-2">
          <p class="text-black text-sm">Kelas</p>
          <p class="text-sm text-primary-dark">{{dataSiswa.namaKelas}}</p>
        </div>
        <div class="flex justify-between py-2">
          <p class="text-black text-sm">Nomor Wali</p>
          <p class="text-sm text-primary-dark">{{dataSiswa.telpon}}</p>
        </div>
        <div class="flex justify-between py-2">
          <p class="text-black text-sm">Email Wali</p>
          <p class="text-sm text-primary-dark">{{dataSiswa.email || '-'}}</p>
        </div>
        <div class="flex justify-between py-2">
          <p class="text-black text-sm">Alamat</p>
          <p class="text-sm text-primary-dark">{{dataSiswa.alamat}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { MasterService } from '~/systems/services/service-master-data'
import { PembayaranService } from '~/systems/services/services-pembayaran' 

export default Vue.extend({
  data() {
    return {
      pembayaranService: new PembayaranService(this.$axios),
      masterService: new MasterService(this.$axios),
      listTa: [] as any,
      id_periode: null,
      dataSiswa: {} as any,
      loading: false,
      imageDefault: require('~/assets/images/default-person.png')
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  mounted(){
    this.initialize()
  },
  methods: {
    async initialize() {
      await this.fetchTa()
      this.handleSearch()
    },
    async fetchTa() {
      this.loading = true
      const _this = this as any
      const result = await this.masterService.request('list-ta')
      if(result.code === 200) {
        const data = result.data
        this.listTa = data
        this.id_periode= _this.listTa[0].id
        this.loading = false
      }
    },
    async handleSearch() {
      this.loading = true
      const data = {
        id_siswa: this.loggedInUser?.id,
        params : { periode: this.id_periode }
      }
      const result = await this.pembayaranService.request('iuran-siswa', data)
      if(result.code === 200) {
        const data = result.data
        this.dataSiswa = data.dataSiswa
        this.loading = false
      }
    },
    setDefaultImage(event: any) { 
      event.target.src = this.imageDefault
    } 
  }
})
</script>