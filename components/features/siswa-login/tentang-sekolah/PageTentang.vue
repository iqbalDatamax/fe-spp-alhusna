<template>
  <div>
    <div class="flex flex-row gap-3 items-center p-4 border-b shadow">
      <i class="fas fa-chevron-left text-xl text-black cursor-pointer" @click="$router.back()"></i>
      <p class="text-primary-dark font-medium text-sm capitalize">Tentang Sekolah</p>
    </div>
    <div class="p-4 flex flex-col">
      <div class="flex my-8 justify-center">
        <img :src="`${$axios.defaults.baseURL}/${model.image_logo}`" alt="photo siswa" class="h-[110px] rounded-full" @error="setDefaultImage">
      </div>
      <div class="divide-y divide-black-light capitalize">
        <div class="flex justify-between py-1">
          <p class="text-sm text-black">Akreditasi</p>
          <p class="text-xs px-2 py-1 font-semibold rounded-full capitalize bg-primary-light text-primary-dark">{{model.akreditasi}}</p>
        </div>
        <div class="flex justify-between py-2">
          <p class="text-black text-sm">Nama</p>
          <p class="text-sm text-primary-dark">{{model.nama}}</p>
        </div>
        <div class="flex justify-between py-2">
          <p class="text-black text-sm">Email Sekolah</p>
          <p class="text-sm text-primary-dark">{{model.email || '-'}}</p>
        </div>
        <div class="flex justify-between py-2">
          <p class="text-black text-sm">Telpon Sekolah</p>
          <p class="text-sm text-primary-dark">{{model.telpon || '-'}}</p>
        </div>
        <div class="flex justify-between py-2">
          <p class="text-black text-sm">Jenis Sekolah</p>
          <p class="text-sm text-primary-dark">{{model.jenis || '-'}}</p>
        </div>
        <div class="flex justify-between py-2">
          <p class="text-black text-sm">Kode Pos</p>
          <p class="text-sm text-primary-dark">{{model.kode_pos || '-'}}</p>
        </div>
        <div class="flex justify-between py-2">
          <p class="text-black text-sm">Website</p>
          <p class="text-sm text-primary-dark">{{model.website || '-'}}</p>
        </div>
        <div class="flex justify-between py-2">
          <p class="text-black text-sm">Faximail</p>
          <p class="text-sm text-primary-dark">{{model.faximail || '-'}}</p>
        </div>
        <div class="flex justify-between py-2">
          <p class="text-black text-sm">Alamat</p>
          <p class="text-sm text-primary-dark">{{model.alamat || '-'}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ProfilService } from '~/systems/services/service-profil' 

export default Vue.extend({
  data() {
    return {
      profilService: new ProfilService(this.$axios),
      imageDefault: require('~/assets/images/logotutwurihandayani.png'),
      model: {} as any,
    }
  },
  mounted() {
    this.fetchProfil()
  },
  methods: {
    setDefaultImage(event: any) { 
      event.target.src = this.imageDefault
    },
    async fetchProfil() {
      const result = await this.profilService.request('get-profil')
      if(result.code === 200) {
        const data = result.data
        this.model = data
      }
    },
  }
})
</script>