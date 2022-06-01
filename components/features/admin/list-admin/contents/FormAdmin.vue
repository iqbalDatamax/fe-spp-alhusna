<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">
      <ValidationProvider v-slot="{ errors }" rules="required">
        <div class="mb-3">
          <q-input v-model="valueContent.nama" label="Nama" placeholder="Masukkan nama" />
          <p class="text-xs text-danger">{{ errors[0] }}</p>
        </div>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" rules="required|email">
        <div class="mb-3">
          <q-input v-model="valueContent.email" type="email" label="E-mail" placeholder="Masukkan email" />
          <p class="text-xs text-danger">{{ errors[0] }}</p>
        </div>
      </ValidationProvider>
      <div class="my-4">
        <p class="label mb-1">Pilih Peran/Hak Akses</p>
        <ValidationProvider v-slot="{ errors }" rules="required" class="mb-3">
        <div class="flex text-body">
          <div class="mr-5 flex items-center">
            <input id="radio1" v-model="valueContent.peran" type="radio" value="admin" class="h-4 w-4">
            <label for="radio1" class="ml-2">Admin</label>
          </div>
          <div class="mr-3 flex items-center">
            <input id="radio2" v-model="valueContent.peran" type="radio" value="super-admin" class="h-4 w-4">
            <label for="radio2" class="ml-2">Super admin</label>
          </div>
        </div>
        <p class="text-xs text-danger">{{ errors[0] }}</p>
        </ValidationProvider>
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

      <div v-if="!valueContent.edit" class="flex justify-between gap-3">
        <ValidationProvider v-slot="{ errors }" rules="required" class="w-full">
          <div class="w-full">
            <q-input v-model="valueContent.password" type="password" class="mb-3" label="Password" placeholder="Masukan password" />
            <p class="text-xs text-danger">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" rules="required" class="w-full">
          <div class="w-full">
            <q-input v-model="valueContent.confirmPassword" type="password" class="mb-3" label="Konfirmasi Password" placeholder="Konfirmasi Password" />
            <p class="text-xs text-danger">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
      </div>
      <!-- button -->
      <div class="flex my-3 border-t pt-3 justify-end gap-3">
        <button class="btn-secondary" @click="$emit('clickModal', 'close')"> Cancel </button>
        <button class="w-2/6" :class="invalid ? 'btn-disable': 'btn-primary'" :disabled="invalid" @click="$emit('clickModal', 'submit')"> Submit </button>
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