<template>
  <div>
    <modal name="modalTa" :width="480" height="auto">
      <div class="p-4">
        <div class="flex justify-between border-b pb-3 mb-3">
          <h3 class="text-black font-semibold text-h4">{{ edit ? 'Edit': 'Tambah'}} Tahun Ajaran</h3>
          <i class="fas fa-times cursor-pointer" @click="handleClickModal('close')"></i>
        </div>
        <div v-if="!edit" class="bg-gray-100 rounded-md flex flex-col items-start p-2 my-4">
          <div class="flex flex-row gap-2">
            <i class="fas fa-info-circle mt-0.5"></i>
            <p class="label">Informasi penting</p>
          </div>
          <p class="label text-danger pl-6">Jika menambahkan ajaran baru maka IURAN SPP dan IURAN Tahunan juga akan ikut terupdate sesuai dengan ajaran baru</p>
        </div>
        <ValidationObserver v-slot="{ invalid }">
          <div>
            <ValidationProvider v-slot="{ errors }" rules="required" class="w-4/5">
              <q-input v-model="valueContent" label="Tahun ajaran" placeholder="masukkan tahun ajaran" />
              <span class="text-xs text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
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
    value: { type: String, default: null },
    edit: { type: Boolean, default: false }
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
        _this.$modal.hide('modalTa')
      } else if (menu === 'submit') {
        _this.$emit('clickModal', 'ta')
      }
    }
  }
})
</script>