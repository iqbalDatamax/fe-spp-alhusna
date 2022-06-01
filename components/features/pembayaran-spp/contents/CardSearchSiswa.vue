<template>
  <div>
    <div class="mb-[15px] flex flex-col lg:flex-row gap-2">
      <select v-model="valueContent.id_periode" class="base-input w-full lg:w-1/6">
        <option v-for="(dt, index) in periode" :key="index" :value="dt.id">{{dt.tahunAjaran}}</option>
      </select>
      <v-select
        v-model="valueContent.id_siswa"
        class="vs h-[40px] px-[3px] border-black-light bg-white outline-none border rounded-[4px] w-full lg:w-1/4"
        placeholder="Cari Siswa berdasarkan NIS/Nama"
        :reduce="(siswa) => siswa.id"
        label="itemSearch"
        :options="listSiswa"
      >
        <span slot="no-options" class="text-danger">
          Siswa tidak ditemukan...
        </span>
      </v-select>
      <button class="btn-primary" @click="$emit('clickButton')"><i class="fas fa-search mr-1"></i> Cari</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import vSelect from 'vue-select'

export default Vue.extend({
  components: {
    vSelect
  },
  props: {
    value: { type: Object, default: () => {}},
    listSiswa: { type: Array, default:()=> [] },
    periode: { type: Array, default:()=> [] }
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

<style scoped>
.vs {
  --vs-border-color: none;
  --vs-search-input-placeholder-color: #9E9E9E;
  --vs-font-size: 14px;
  --vs-line-height: 1.9;
}
</style>