<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">
      <div class="flex flex-col w-full lg:w-1/2">
        <ValidationProvider v-slot="{ errors }" rules="required" class="w-full">
          <label class="label">Pilih Periode <span class="text-danger">*</span></label>
          <select v-model="valueContent.id_periode" class="base-input  mt-[5px]">
            <option v-for="(dt, index) in periode" :key="index" :value="dt.id">{{dt.tahunAjaran}}</option>
          </select>
          <p class="text-xs text-danger">{{ errors[0] }}</p>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" rules="required" class="w-full mt-2.5">
          <label class="label">Pilih Siswa <span class="text-danger">*</span></label>
          <v-select
            v-model="valueContent.id_siswa"
            class="vs h-[40px] px-[3px] border-black-light bg-white outline-none border rounded-[4px] w-full"
            placeholder="Cari Siswa berdasarkan NIS/Nama"
            :reduce="(siswa) => siswa.id"
            label="itemSearch"
            :options="siswa"
          >
            <span slot="no-options" class="text-danger">
              Siswa tidak ditemukan...
            </span>
          </v-select>
          <p class="text-xs text-danger">{{ errors[0] }}</p>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" rules="required" class="w-full mt-2.5">
          <label class="label">Pilih Ekskul / Pembayaran lainya<span class="text-danger">*</span></label>
          <v-select
            v-model="valueContent.ekskul"
            class="vs h-[40px] px-[3px] border-black-light bg-white outline-none border rounded-[4px] w-full"
            placeholder="Cari Ekstracurikuler / pembayaran lainnya"
            :reduce="(ekskul) => ekskul.id"
            label="namaEkskul"
            :options="ekskul"
          >
            <span slot="no-options" class="text-danger">
              Ekskul / jenis pembayaran tidak ditemukan...
            </span>
          </v-select>
          <p class="text-xs text-danger">{{ errors[0] }}</p>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" rules="required" class="w-full mt-2.5">
          <div>
            <q-input-price v-model="valueContent.ansuran" label="IURAN" placeholder="Masukkan iuran" :required="true" />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
        <div class="mt-2.5">
          <q-text-area v-model="valueContent.deskripsi" label="Deskripsi" placeholder="Masukkan Deskripsi" />
        </div>
      </div>
      <!-- button -->
      <div class="flex my-3 border-t pt-3 justify-end gap-3 w-full lg:w-1/2">
        <!-- <button class="btn-error" @click="$emit('clickButton', 'submit')"> Tampilkan Pembayaran Ekskul </button> -->
        <button class="w-2/6" :class="invalid ? 'btn-disable': 'btn-primary'" :disabled="invalid" @click="$emit('clickButton')"> Submit Pembayaran </button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from 'vue-select'

export default Vue.extend({
  components: {
    ValidationProvider,
    ValidationObserver,
    vSelect
  },
  props: {
    model: { type: Object, default:() => {} },
    ekskul: { type: Array, default: () => []},
    siswa: { type: Array, default: () => []},
    periode: { type: Array, default: () => []}
  },
  computed: {
    valueContent: {
			get(): any {
				return (this as any).model
			},
			set(model): void {
				;(this as any).$emit('input', model)
			}
		},
  }
})
</script>

<style scoped>
.vs {
  --vs-border-color: none;
  --vs-search-input-placeholder-color: #9E9E9E;
  --vs-font-size: 14px;
  --vs-line-height: 1.9;
  --vs-dropdown-max-height: 120px;
}
</style>