<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">
      <ValidationProvider v-slot="{ errors }" rules="required">
        <div class="mb-3">
          <q-input v-model="valueContent.nama_kelas" label="Nama Kelas" placeholder="Masukkan nama" />
          <p class="text-xs text-danger">{{ errors[0] }}</p>
        </div>
      </ValidationProvider>
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
  data(){
    return {
      tesData:[
        {id:1, nama:"tes"},
        {id:2, nama:"tes2"}
      ]
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
  },
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
