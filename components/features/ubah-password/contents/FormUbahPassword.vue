<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">
      <div class="flex flex-col w-full lg:w-1/2">
        <div class="my-4">
          <p class="label mb-1">Pilih yang mau diubah</p>
          <div class="flex text-body">
            <div class="mr-5 flex items-center">
              <input id="radioAdmin" v-model="valueContent.peran" type="radio" value="admin" class="h-4 w-4">
              <label for="radioAdmin" class="ml-2">Admin</label>
            </div>
            <div class="mr-3 flex items-center">
              <input id="radioGuru" v-model="valueContent.peran" type="radio" value="guru" class="h-4 w-4">
              <label for="radioGuru" class="ml-2">Guru</label>
            </div>
            <div class="mr-3 flex items-center">
              <input id="radioSiswa" v-model="valueContent.peran" type="radio" value="siswa" class="h-4 w-4">
              <label for="radioSiswa" class="ml-2">Siswa</label>
            </div>
          </div>
        </div>
        <ValidationProvider v-if="valueContent.peran === 'siswa'" v-slot="{ errors }" rules="required" class="w-full">
          <label class="label">Cari dan pilih NIS siswa <span class="text-danger">*</span></label>
          <v-select
            v-model="valueContent.email"
            class="vs h-[40px] px-[3px] border-black-light bg-white outline-none border rounded-[4px] w-full"
            placeholder="Cari nis siswa"
            :reduce="(admin) => admin.nis"
            label="nis"
            :options="admin"
          >
            <span slot="no-options" class="text-danger">
              NIS siswa tidak ditemukan...
            </span>
          </v-select>
          <p class="text-xs text-danger">{{ errors[0] }}</p>
        </ValidationProvider>

        <ValidationProvider v-else v-slot="{ errors }" rules="required" class="w-full">
          <label class="label">Cari dan pilih Email Admin/Guru <span class="text-danger">*</span></label>
          <v-select
            v-model="valueContent.email"
            class="vs h-[40px] px-[3px] border-black-light bg-white outline-none border rounded-[4px] w-full"
            placeholder="Cari Admin berdasarkan Email"
            :reduce="(admin) => admin.email"
            label="email"
            :options="admin"
          >
            <span slot="no-options" class="text-danger">
              Admin atau guru tidak ditemukan...
            </span>
          </v-select>
          <p class="text-xs text-danger">{{ errors[0] }}</p>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" rules="required" class="w-full mt-2.5">
          <div>
            <q-input v-model="valueContent.password_baru" label="Password Baru" type="password" placeholder="Masukkan Password Baru" :required="true" />
            <p class="text-xs text-danger">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
      </div>
      <!-- button -->
      <div class="flex my-3 border-t pt-3 justify-end gap-3 w-full lg:w-1/2">
        <!-- <button class="btn-error" @click="$emit('clickButton', 'submit')"> Tampilkan Pembayaran Ekskul </button> -->
        <button class="w-2/6" :class="invalid ? 'btn-disable': 'btn-primary'" :disabled="invalid" @click="$emit('clickButton')"> Simpan Password </button>
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
    admin: { type: Array, default: () => []}
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