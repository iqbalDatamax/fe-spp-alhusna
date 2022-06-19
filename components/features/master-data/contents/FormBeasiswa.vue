<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">
      <ValidationProvider v-slot="{ errors }" rules="required">
        <div>
          <label class="label">Siswa</label>
          <v-select
    				v-model="valueContent.id_siswa"
						class="vs h-[40px] px-[3px] border-black-light bg-white outline-none border rounded-[4px]"
						placeholder="Pilih Siswa"
    				label="itemSearch"
            :reduce="(siswa) => siswa.id"
    				:options="user"
    			>
    		  </v-select>
          <p class="text-xs text-danger">{{ errors[0] }}</p>
        </div>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" rules="required">
        <div class="my-3">
          <label class="label">Tahun Ajaran</label>
          <select v-model="valueContent.id_periode" class="base-input mt-[5px]">
            <option v-for="(dt, index) in periode" :key="index" :value="dt.id">{{dt.tahunAjaran}}</option>
          </select>
          <p class="text-xs text-danger">{{ errors[0] }}</p>
        </div>
      </ValidationProvider>
      <div class="flex flex-col lg:flex-row lg:gap-3">
        <ValidationProvider v-slot="{ errors }" rules="required" class="w-full lg:w-1/2">
          <div class="mb-3">
            <q-input-price v-model="valueContent.potongan_spp" label="Potongan SPP" placeholder="Masukkan potongan spp" :required="true" />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" rules="required" class="w-full lg:w-1/2">
          <div class="mb-3">
            <q-input-price v-model="valueContent.potongan_iuran" label="Potongan IURAN" placeholder="Masukkan potongan iuran" :required="true" />
            <span class="text-xs text-danger">{{ errors[0] }}</span>
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
import vSelect from 'vue-select'

export default Vue.extend({
  components: {
    ValidationProvider,
    ValidationObserver,
    vSelect
  },
  props: {
    model: { type: Object, default:() => {} },
    user: { type: Array, default:()=> [] },
    periode: { type: Array, default:()=> [] }
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
