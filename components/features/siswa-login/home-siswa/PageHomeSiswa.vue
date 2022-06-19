<template>
  <div>
    <nav-bar />
    <div class="mx-3.5 mt-2">
      <img class="h-[200px] w-full object-cover rounded-lg" :src="`${$axios.defaults.baseURL}/${model.image_bg}`" alt="login bg"  @error="setDefaultImage">
      <p class="text-sm text-center text-black mt-3.5">Informasi Sekolah Al-Husna</p>
      <p class="text-sm text-center text-black">Pembayaran SPP dan IURAN Siswa</p>
      <div class="mt-5 grid grid-cols-2 gap-3.5">
        <div v-for="dt in dataCategoris" :key="dt.id">
          <nuxt-link :to="dt.path" class="flex flex-col justify-center items-center border border-primary p-2.5 rounded-lg cursor-pointer shadow-md">
            <i class="text-primary text-3xl mb-2" :class="dt.icon"></i>
            <p class="text-black text-xs text-center capitalize">{{dt.text}}</p>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ProfilService } from '~/systems/services/service-profil' 

export default Vue.extend({
  components: {
    NavBar: () => import('@/components/features/public/navbar/NavSiswa.vue')
  },
  data() {
    return {
      profilService: new ProfilService(this.$axios),
      imageDefault: require('~/assets/images/bg-sekolah.jpg'),
      dataCategoris: [
        { id: 'spp', text: 'Cek Pembayaran SPP', icon:'far fa-list-alt', path:'/spp-siswa' },
        { id: 'iuran', text: 'Cek Pembayaran IURAN', icon:'fas fa-tasks', path:'/iuran-siswa' },
        { id: 'profil', text: 'My Profile', icon:'fas fa-user', path:'/profile-siswa' },
        { id: 'tentang', text: 'Tentang Sekolah', icon:'fas fa-building', path:'/tentang-sekolah' },
      ],
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