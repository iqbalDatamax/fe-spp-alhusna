<template>
  <div>
    <div class="flex flex-row gap-3 items-center">
      <img class="h-[90px] mb-2" :src="`${$axios.defaults.baseURL}/${profil.image_logo}`" alt="tuturi logo" @error="setDefaultImage">
      <div class="flex flex-col text-black">
        <h1 class="text-h2 font-semibold uppercase">{{profil.nama || 'SD SMP Al-Husna'}}</h1>
        <p class="text-caption">{{profil.alamat || 'Jakarta' }}</p>
        <p class="text-caption">Telp: {{profil.telpon || '087'}} | Email: {{profil.email || 'alhusna@gmail.com'}} | Web: {{profil.website || 'www.alhusna.sch.id'}}</p>
      </div>
    </div>
    <div class="border-t border-black">
      <p class="text-center p-1 uppercase">Pembayaran</p>
    </div>
    <div class="flex flex-row border-t border-b border-black text-caption uppercase">
      <div class="w-1/2 px-2">
        <div class="flex flex-row py-0.5">
          <p class="w-1/4">Nama</p>
          <p class="w-3/4">: {{siswa.nama}}</p>
        </div>
        <div class="flex flex-row py-0.5">
          <p class="w-1/4">NIS</p>
          <p class="w-3/4">: {{siswa.nis}}</p>
        </div>
        <div class="flex flex-row py-0.5">
          <p class="w-1/4">Kelas</p>
          <p class="w-3/4">: {{siswa.namaKelas}}</p>
        </div>
      </div>
      <div class="w-1/2 px-2">
        <div class="flex flex-row py-0.5">
          <p class="w-2/5">Tahun Ajaran</p>
          <p class="w-3/5">: {{ta}}</p>
        </div>
        <div class="flex flex-row py-0.5">
          <p class="w-2/5">Tanggal</p>
          <p class="w-3/5">: {{tgl}}</p>
        </div>
      </div>
    </div>
    <table class="min-w-full divide-y divide-black">
      <thead class="text-caption">
        <th class="py-2 px-1 text-black text-center" >
          No
        </th>
        <th class="py-2 px-2 text-black text-left" >
          Keterrangan Pembayaran
        </th>
        <th class="py-2 px-2 text-black text-right" >
          Jumlah (Rp)
        </th>
      </thead>
      <tbody class="bg-white">
        <tr v-for="(dt, i) in list" :key="i" class="text-caption">
          <td class="text-center px-1 py-1">{{i + 1}}</td>
          <td class="text-left px-2 py-1 capitalize">SPP Bulan {{dt.bulan}}</td>
          <td class="text-right px-2 py-1">Rp {{dt.ansuran}}</td>
        </tr>
      </tbody>
    </table>
    <div class="border-t border-black pt-2 flex justify-end">
      <div class="flex flex-col">
        <div class="flex flex-row text-caption pr-2 justify-end">
          <p class="font-medium mr-4">Sub Total: </p>
          <p class="font-medium">Rp. {{subTotal}}</p>
        </div>
        <div class="border-b border-black flex flex-row text-caption pr-2 justify-end">
          <p class="font-medium mr-4">Beasiswa / Potongan: </p>
          <p class="font-medium">Rp. {{potongan || 0}}</p>
        </div>
        <div class="border-b border-black flex flex-row text-caption pr-2 justify-end">
          <p class="font-semibold mr-4">Grand Total: </p>
          <p class="font-semibold">Rp. {{grandTotal}}</p>
        </div>
      </div>
    </div>
    <div class="mt-4 flex justify-between">
      <div class="flex flex-col justify-end text-caption-sm">
        <p>Catatan:</p>
        <p>- Disimpan sebagai bukti pembayaran yang SAH</p>
        <p>- Uang sudah dibayarkan tidak dapat diminta kembali.</p>
      </div>
      <div class="flex flex-col text-caption items-center w-1/4">
        <p class="text-center">Jakarta, {{tgl}}</p>
        <p class="mb-8 text-center">Penerima</p>
        <p class="text-center underline uppercase">{{loggedInUser.nama}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { ProfilService } from '~/systems/services/service-profil' 
import { formatterNumber, formatterCurrency } from '@/systems/helpers/formatter'

export default Vue.extend({
  props: {
    list: { type: Array, default: () => [] },
    siswa: { type: Object, default: () => {} },
    ta: {type: String, default: ''},
    tgl: {type: String, default: ''}
  },
  data() {
    return {
      profilService: new ProfilService(this.$axios),
      profil: {} as any,
      imageDefault: require("~/assets/images/logotutwurihandayani.png")
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
    subTotal() {
      let total = 0
      this.list.forEach((item:any) => {
        const number = formatterNumber(item.ansuran) || 0
        total += number
      })
      return formatterCurrency(total)
    },
    potongan() {
      let total = 0
      this.list.forEach((item:any) => {
        const number = formatterNumber(item.potongan) || 0
        total += number
      })
      return formatterCurrency(total)
    },
    grandTotal() {
      let total = 0
      this.list.forEach((item:any) => {
        const number = formatterNumber(item.total) || 0
        total += number
      })
      return formatterCurrency(total)
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
    setDefaultImage(event: any) { 
      event.target.src = this.imageDefault
    } 
  }
})
</script>