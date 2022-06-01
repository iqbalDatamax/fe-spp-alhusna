<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">
      <div class="flex flex-col lg:flex-row gap-4 mb-4">
        <div class="flex flex-col w-1/4">
          <div>
            <upload-image v-model="valueContent.image_logo" :key-um="keyLogo" label="Upload logo sekolah" />
          </div>
          <div v-if="valueContent.image_logo" class="my-2">
            <img :src="valueContent.image_logo.length < 150 ? `${$axios.defaults.baseURL}/${valueContent.image_logo}` : valueContent.image_logo" alt="gambar background web sekolah" class="w-32 h-32">
          </div>
        </div>
        <div class="flex flex-col">
          <div>
            <upload-image v-model="valueContent.image_bg" :key-um="keyBg" label="Upload gambar background web sekolah" />
          </div>
          <div v-if="valueContent.image_bg" class="my-2">
            <img :src="valueContent.image_bg.length < 150 ? `${$axios.defaults.baseURL}/${valueContent.image_bg}` : valueContent.image_bg" alt="gambar background web sekolah" class="w-96 h-60">
          </div>
        </div>
      </div>

      <ValidationProvider v-slot="{ errors }" rules="required" class="w-full">
        <div class="mb-3">
          <q-input v-model="valueContent.nama" label="Nama Sekolah" placeholder="Masukkan nama sekolah" :required="true" />
          <p class="text-xs text-danger">{{ errors[0] }}</p>
        </div>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" rules="required" class="w-full">
        <div class="mb-3">
          <q-text-area v-model="valueContent.alamat" label="Alamat Sekolah" placeholder="Masukan alamat sekolah" :required="true" />
          <p class="text-xs text-danger">{{ errors[0] }}</p>
        </div>
      </ValidationProvider>

      <div class="flex flex-col lg:flex-row gap-4 mb-4">
        <div class="w-full">
          <q-input v-model="valueContent.pimpinan" label="Kepala Sekolah" placeholder="Masukkan nama kepala sekolah berserta gelar"  />
        </div>
        <div class="w-full">
          <q-input v-model="valueContent.nip_pimpinan" label="NIP Kepala Sekolah" placeholder="Masukkan NIP kepala sekolah" />
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-4 mb-4">
        <div class="w-full">
          <q-input v-model="valueContent.email" label="Email" placeholder="Masukkan email sekolah"  />
        </div>
        <div class="w-full">
          <q-input v-model="valueContent.telpon" label="Telepon" placeholder="Masukkan telpon sekolah" />
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-4 mb-4">
        <div class="w-full">
          <q-input v-model="valueContent.website" label="Website" placeholder="Masukkan website sekolah"  />
        </div>
        <div class="w-full">
          <q-input v-model="valueContent.kode_pos" label="Kode Pos" placeholder="Masukkan kode pos" />
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-4 mb-4">
        <div class="w-full">
          <q-input v-model="valueContent.faximail" label="Faximail" placeholder="Masukkan faximail sekolah"  />
        </div>
        <div class="w-full">
          <q-input v-model="valueContent.jenis" label="Jenis" placeholder="Masukkan jenis sekolah" />
        </div>
        <div class="w-full">
          <q-input v-model="valueContent.akreditasi" label="Akreditasi" placeholder="Masukkan Akreditasi" />
        </div>
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
    model: { type: Object, default:() => {} },
    kelas: { type: Array, default: () => []}
  },
  data() {
    return {
      keyLogo:"logo",
      keyBg:"bg"
    }
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