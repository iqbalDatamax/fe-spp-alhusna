<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">
      <div class="flex flex-col gap-2 mb-4">
        <ValidationProvider v-slot="{ errors }" rules="required">
          <q-input v-model="valueContent.nama_ekskul" label="Nama Ekstrakurikuler" placeholder="Masukan Nama Ekstrakurikuler" />
          <span class="text-xs text-danger">{{ errors[0] }}</span>
        </ValidationProvider>
        <div class="mb-3">
          <q-text-area v-model="valueContent.description" label="Deskripsi" placeholder="Masukan Deskripsi Ekstrakurikuler" />
        </div>
        <!-- button -->
      <div class="flex my-3 border-t pt-3 justify-end gap-3">
        <button class="btn-secondary" @click="$emit('clickButton', 'close')"> Cancel </button>
        <button class="w-2/6" :class="invalid ? 'btn-disable': 'btn-primary'" :disabled="invalid" @click="$emit('clickButton', 'submit')"> Submit </button>
      </div>
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
			set(value): void {
				;(this as any).$emit('input', value)
			}
		},
  }
})
</script>