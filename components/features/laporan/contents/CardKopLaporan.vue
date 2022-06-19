<template>
  <div>
    <div class="flex flex-row gap-3 items-center justify-center pb-3">
      <!-- <img src="~/assets/images/logotutwurihandayani.png" class="h-[90px] w-[100px]"> -->
      <div class="flex flex-col text-center">
        <h1 class="text-h2 font-semibold uppercase">{{profil.nama || 'SD SMP Al-Husna'}}</h1>
        <p class="text-caption">{{profil.alamat || 'Jakarta' }}</p>
        <p class="text-caption">Telp: {{profil.telpon || '087'}} | Email: {{profil.email || 'alhusna@gmail.com'}} | Web: {{profil.website || 'www.alhusna.sch.id'}}</p>
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
      profil: {} as any
    }
  },
  mounted() {
    this.fetchProfil()
  },
  methods: {
    async fetchProfil() {
      const result = await this.profilService.request('get-profil')
      if(result.code === 200) {
        const data = result.data
        this.profil = data
      }
    },
  }
})
</script>
