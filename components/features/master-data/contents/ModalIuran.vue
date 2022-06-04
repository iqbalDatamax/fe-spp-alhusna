<template>
  <div>
    <modal name="modalIuran" :width="520" height="auto">
      <div class="p-4">
        <div class="flex justify-between border-b pb-3 mb-3">
          <h3 class="text-black font-semibold text-h4">IURAN</h3>
          <i class="fas fa-times cursor-pointer" @click="handleClickModal('close')"></i>
        </div>
        <div class="bg-gray-100 rounded-md flex flex-col items-start p-2 my-4">
          <div class="flex flex-row gap-2">
            <i class="fas fa-info-circle mt-0.5"></i>
            <p class="label">Informasi penting</p>
          </div>
          <p class="label text-danger pl-6">Pastikan anda menginput besaran IURAN SPP dan Tahunan dengan benar. Karena anda tidak dapat mengubah IURAN SPP dan Tahunan lagi!</p>
        </div>
        <ValidationObserver v-slot="{ invalid }">
          <div class="mb-3">
            <p class="text-black font-semibold text-sm">{{ valueContent.namaKelas }}</p>
          </div>
          <div class="mb-3">
            <ValidationProvider v-slot="{ errors }" rules="required" class="w-4/5">
              <q-input-price v-model="valueContent.iuran_spp" label="IURAN SPP" placeholder="Masukkan iuran SPP" />
              <span class="text-xs text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="mb-3">
            <ValidationProvider v-slot="{ errors }" rules="required" class="w-4/5">
              <q-input-price v-model="valueContent.iuran_tahunan" label="IURAN Tahunan" placeholder="Masukkan iuran tahunan" />
              <span class="text-xs text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <!-- <div class="flex flex-col mb-3">
            <label class="label mb-2">Pilih Kelas Jika IURAN Sama</label>
            <div class="flex flex-wrap gap-1">
              <div v-for="(item, index) in items" :key="index" class="px-2 py-1 border border-primary bg-white rounded-full cursor-pointer">
                <p class="text-xs">{{item.namaKelas}}</p>
              </div>
            </div>
          </div> -->
          <!-- button -->
          <div class="flex my-3 border-t pt-3 justify-end gap-3">
            <button class="btn-secondary" @click="handleClickModal('close')"> Cancel </button>
            <button class="w-2/6" :class="invalid ? 'btn-disable': 'btn-primary'" :disabled="invalid" @click="handleClickModal('submit')"> Submit </button>
          </div>
        </ValidationObserver>
      </div>
    </modal>
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
    value: { type: Object, default: () => {} },
    items: { type: Array, default: () => [] }
  },
  computed: {
    valueContent: {
			get(): any {
				return (this as any).value
			},
			set(value): void {
				;(this as any).$emit('input', value)
			}
		},
  },
  methods: {
    handleClickModal(menu:any) {
      const _this = this as any
      if(menu === 'close') {
        _this.$modal.hide('modalIuran')
      } else if (menu === 'submit') {
        _this.$emit('clickModal', 'iuran')
      }
    }
  }
})
</script>