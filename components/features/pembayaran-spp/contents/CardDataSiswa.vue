<template>
  <div class="shadow p-2.5 border rounded">
    <p class="text-black text-h5 font-semibold mb-2.5">Data Siswa</p>
    <div class="flex flex-row gap-4 capitalize">
      <div class="w-2/5 divide-y px-4">
        <div class="flex flex-row py-1.5 text-body">
          <p class="w-1/4">Nama</p>
          <p class="w-3/4">: {{siswa.nama}}</p>
        </div>
        <div class="flex flex-row py-1.5 text-body">
          <p class="w-1/4">NIS</p>
          <p class="w-3/4">: {{siswa.nis}}</p>
        </div>
        <div class="flex flex-row py-1.5 text-body">
          <p class="w-1/4">Jenis Kelamin</p>
          <p class="w-3/4">: {{siswa.jk}}</p>
        </div>
      </div>
      <div class="w-2/5 divide-y px-4">
        <div class="flex flex-row py-1.5 text-body">
          <p class="w-1/4">Kelas</p>
          <p class="w-3/4">: {{siswa.namaKelas}}</p>
        </div>
        <div class="flex flex-row py-1.5 text-body">
          <p class="w-1/4">Alamat</p>
          <p class="w-3/4">: {{siswa.alamat}}</p>
        </div>
      </div>
      <div class="w-1/5 flex justify-center">
        <img :src="`${$axios.defaults.baseURL}/${siswa.photo}`" alt="photo siswa" class="h-[140px] border" @error="setDefaultImage">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    siswa: { type: Object, default: () => {}}
  },
  data() {
    return {
      imageDefault: require('~/assets/images/default-person.png')
    }
  },
  methods: {
    setDefaultImage(event: any) { 
      event.target.src = this.imageDefault
    } 
  }
})
</script>