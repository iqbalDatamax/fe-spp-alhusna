<template>
  <div class="w-full lg:w-1/2">
    <p class="text-black font-semibold text-h5 mb-4">Filter Laporan</p>
    <div class="flex flex-col">
      <div class="mb-[15px] flex flex-col lg:flex-row gap-2">
        <div class="w-full">
          <label class="capitalize label">Periode</label>
          <select v-model="valueContent.id_periode" class="base-input  mt-[5px]">
            <option v-for="(dt, index) in periode" :key="index" :value="dt.id">{{dt.tahunAjaran}}</option>
          </select>
        </div>
        <div class="w-full">
          <label class="capitalize label">Status Bayar</label>
          <select v-model="valueContent.status" class="base-input mt-[5px]">
            <option value="">Semua</option>
            <option value="lunas">Lunas</option>
            <option value="belum lunas">Belum Lunas</option>
          </select>
        </div>
        <div class="w-full">
          <label class="capitalize label">Kelas</label>
          <select v-model="valueContent.id_kelas" class="base-input mt-[5px]">
            <option v-for="(dt, index) in kelas" :key="index" :value="dt.id">{{dt.namaKelas}}</option>
          </select>
        </div>
      </div>
    </div>
    <div>
      <div v-if="valueContent.status === 'lunas'" class="mb-[15px] flex flex-col lg:flex-row gap-2">
        <div class="w-full">
          <q-input v-model="valueContent.startDate" label="Dari Tanggal" type="date" placeholder="Dari Tanggal" />
        </div>
        <div class="w-full">
          <q-input v-model="valueContent.endDate" label="Sampai Tanggal" type="date" placeholder="Sampai Tanggal" />
        </div>
      </div>
      <div class="flex justify-end gap-3">
        <button v-if="isPrint" class="btn-error" @click="$emit('clickPrint')"><i class="fas fa-download"></i>  Download Laporan</button>
        <button class="btn-primary" @click="$emit('clickButton')">Tampilkan</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: { type: Object, default: () => {}},
    periode: { type: Array, default:()=> [] },
    kelas: { type: Array, default: () => []},
    isPrint: { type: Boolean, default: false }
  },
  computed: {
    valueContent: {
			get(): any {
				return (this as any).value
			},
			set(value): void {
				;(this as any).$emit('input', value)
			}
		}
  }
})
</script>