<template>
  <div class="shadow p-2.5 border rounded mt-2.5">
    <p class="text-black text-h5 font-semibold mb-2.5">Data IURAN</p>
    <div class="flex flex-row gap-4 capitalize">
      <div class="w-1/2 divide-y px-4">
        <div class="flex flex-row py-1.5 text-h5">
          <p class="w-1/2">IURAN Per Periode</p>
          <p class="w-1/2">: Rp. {{currencyFormat(iuran)}}</p>
        </div>
        <div v-if="potongan > 0" class="flex flex-row py-1.5 text-h5">
          <p class="w-1/2">Beasiswa / potongan</p>
          <p class="w-1/2">: Rp. {{currencyFormat(potongan)}}</p>
        </div>
        <div class="flex flex-row py-1.5 text-h5">
          <p class="w-1/2">Sudah Dibayar</p>
          <p class="w-1/2">: Rp. {{currencyFormat(ansuran) || 0}}</p>
        </div>
        <div class="flex flex-row py-1.5 text-h5">
          <p class="w-1/2">Belum Dibayar</p>
          <p class="w-1/2 text-danger">: Rp. {{currencyFormat(sisaBayar) || 0}}</p>
        </div>
        <div class="flex flex-row py-1.5 text-h5">
          <p class="w-1/2">Status</p>
          <p class="w-1/2">: {{status}}</p>
        </div>
        <!-- <button class="text-primary text-body mt-3" @click="$emit('clickHistory')">Cek History Pembayaran</button> -->
      </div>
      <div v-if="sisaBayar > 0" class="w-1/2 px-4">
        <ValidationObserver v-slot="{ invalid }" class="flex flex-col">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <label class="label">Pembayaran IURAN</label>
            <input v-model="valueContent" type="tel" class="base-input" placeholder="Isikan Nominal Pembayaran" autocomplete="false" @input="handleInput">
            <span class="text-xs text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
          <button class="mt-3" :class="invalid ? 'btn-disable': 'btn-error'" :disabled="invalid" @click="$emit('clickButton')">Bayar Iuran</button>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { formatterCurrency } from '@/systems/helpers/formatter'
import { debounce } from '@/systems/helpers/common'

export default Vue.extend({
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    iuran: { type: [Number, String], default: null },
    sisaBayar: { type: [Number, String], default: null },
    potongan: { type: [Number, String], default: null },
    ansuran: { type: [Number, String], default: null },
    status: { type: String, default: null },
    value: { type: [Number, String], default: null }
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
    currencyFormat(nominal:any) {
      return formatterCurrency(nominal)
    },
    handleInput(evt: any): void {
      const target = evt?.target
			debounce(() => {
				const value = target?.value || null
				if (value === null) {
					this.$set(this, 'valueContent', '')
					return
				}
				this.$set(this, 'valueContent', formatterCurrency(value))
			}, 300)()
		}
  }
})
</script>