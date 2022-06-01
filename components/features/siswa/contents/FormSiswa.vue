<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">
      <div class="flex flex-col lg:flex-row gap-4 mb-4">
        <ValidationProvider v-slot="{ errors }" rules="required" class="w-full">
          <div>
            <q-input v-model="valueContent.nama" label="Nama" placeholder="Masukkan nama" :required="true" />
            <p class="text-xs text-danger">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" rules="required|numeric" class="w-full">
          <div>
            <q-input v-model="valueContent.nis" type="tel" label="NIS" placeholder="Masukkan NIS" :required="true" />
            <p class="text-xs text-danger">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
      </div>
      <div class="flex flex-col lg:flex-row gap-4 mb-4">
        <ValidationProvider v-slot="{ errors }" rules="required" class="w-full">
          <div>
            <q-input v-model="valueContent.tempat_lahir" label="Tempat Lahir" placeholder="Masukkan tempat lahir"  :required="true" />
            <p class="text-xs text-danger">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" rules="required" class="w-full">
          <div>
            <q-input v-model="valueContent.tanggal_lahir" type="date" label="Tanggal Lahir"  :required="true" />
            <p class="text-xs text-danger">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
      </div>
      <div class="mb-3">
        <q-text-area v-model="valueContent.alamat" label="Alamat" placeholder="Masukan alamat" />
      </div>
      <div v-if="valueContent.edit" class="my-4">
        <p class="label mb-1">Status</p>
        <div class="flex text-body">
          <div class="mr-5 flex items-center">
            <input id="radioaktif" v-model="valueContent.status" type="radio" value="aktif" class="h-4 w-4">
            <label for="radioaktif" class="ml-2">Aktif</label>
          </div>
          <div class="mr-3 flex items-center">
            <input id="radiononaktif" v-model="valueContent.status" type="radio" value="tidak-aktif" class="h-4 w-4">
            <label for="radiononaktif" class="ml-2">Tidak Aktifk</label>
          </div>
        </div>
      </div>

      <div class="flex flex-row lg:flex-row gap-4 mb-4">
        <div class="mb-3 w-full lg:w-1/2">
          <q-input v-model="valueContent.email" type="email" label="E-mail Orang Tua / Wali" placeholder="Masukkan email" />
        </div>
        <div class="mb-3 w-full lg:w-1/2">
          <q-input v-model="valueContent.telpon" type="email" label="Nomor Telpon/WA Orang Tua / Wali" placeholder="Masukkan nomor telpon" />
        </div>
      </div>

      <div class="flex flex-row lg:flex-row gap-4 mb-4">
        <div class="flex flex-row w-1/2">
          <div>
            <upload-image v-model="valueContent.photo" key-um="logo" label="Upload photo siswa" />
          </div>
          <div v-if="valueContent.photo" class="my-2 ml-2">
            <img :src="valueContent.photo.length < 100 ? `${$axios.defaults.baseURL}/${valueContent.photo}` : valueContent.photo" alt="gambar background web sekolah" class="w-32 h-32">
          </div>
        </div>
        <div class="w-full lg:w-1/2">
          <p class="label mb-1">Pilih Jenis Kelamin <span class="text-danger"> *</span></p>
          <ValidationProvider v-slot="{ errors }" rules="required">
          <div class="flex text-body">
            <div class="mr-5 flex items-center">
              <input id="radio1" v-model="valueContent.jenis_kelamin" type="radio" value="laki-laki" class="h-4 w-4">
              <label for="radio1" class="ml-2">Laki-laki</label>
            </div>
            <div class="mr-3 flex items-center">
              <input id="radio2" v-model="valueContent.jenis_kelamin" type="radio" value="perempuan" class="h-4 w-4">
              <label for="radio2" class="ml-2">Perempuan</label>
            </div>
          </div>
          <p class="text-xs text-danger">{{ errors[0] }}</p>
          </ValidationProvider>
        </div>
      </div>

      <div v-if="!valueContent.edit" class="mt-6 mb-2">
        <div class="mr-5 flex items-center">
          <input id="check" v-model="valueContent.check" type="checkbox" class="h-4 w-4" :disabled="!valueContent.tanggal_lahir" @change="$emit('changeCheck')">
          <label for="check" class="ml-2 label">Set password sesuai tanggal lahir <span class="text-primary">yyyymmdd</span> (exp: 20220409)</label>
        </div>
      </div>

      <div v-if="!valueContent.edit" class="flex flex-col lg:flex-row gap-4 mb-4">
        <ValidationProvider v-slot="{ errors }" rules="required" class="w-full">
          <div>
            <q-input v-model="valueContent.password" type="password" label="Password" placeholder="Masukan password" />
            <p class="text-xs text-danger">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" rules="required" class="w-full">
          <div>
            <q-input v-model="valueContent.confirmPassword" type="password" label="Konfirmasi Password" placeholder="Konfirmasi Password" />
            <p class="text-xs text-danger">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
      </div>
      <!-- button -->
      <div class="flex my-3 border-t pt-3 justify-end gap-3">
        <button class="btn-secondary" @click="$emit('clickButton', 'close')"> Cancel </button>
        <button class="w-2/6" :class="invalid ? 'btn-disable': 'btn-primary'" :disabled="invalid" @click="$emit('clickButton', 'submit')"> Submit </button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default Vue.extend({
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    model: { type: Object, default:() => {} }
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