<template>
  <div>
    <div class="border-t border-black pt-2 flex justify-end">
      <div class="flex flex-col">
        <div v-if="subTotal" class="flex flex-row text-body pr-6 justify-end py-1.5">
          <p class="font-medium mr-12">Sub Total Iuran: </p>
          <p class="font-medium">Rp. {{subTotal}}</p>
        </div>
        <div v-if="potongan" class="border-b border-black flex flex-row text-body pr-6 justify-end py-1.5">
          <p class="font-medium mr-12">Total Beasiswa / Potongan: </p>
          <p class="font-medium">Rp. {{potongan}}</p>
        </div>
        <div v-if="grandTotal" class="border-b border-black flex flex-row text-h5 pr-6 justify-end py-1.5">
          <p class="font-semibold mr-12">Grand Total: </p>
          <p class="font-semibold">Rp. {{grandTotal}}</p>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-12">
      <div class="flex flex-col text-body items-center w-1/4">
        <p class="text-center">Jakarta, {{tglCurrent}}</p>
        <p class="mb-12 text-center">Kepala Sekolah</p>
        <p class="text-center border-b border-black">{{profil.pimpinan || 'H. Sabrun, S.Pd'}}</p>
        <p class="text-center">Nip.{{profil.nip_pimpinan || '20130875757'}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ProfilService } from '~/systems/services/service-profil' 

export default Vue.extend({
  props: {
    subTotal: { type: [Number, String], default: null },
    potongan: { type: [Number, String], default: null },
    grandTotal: { type: [Number, String], default: null },
    tglCurrent: { type: String, default: null }
  },
  data() {
    return {
      profilService: new ProfilService(this.$axios),
      profil: {} as any,
      imageDefault: require("~/assets/images/logotutwurihandayani.png")
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
    }
  }
})
</script>