<template>
  <div>
    <div v-if="label" class="mb-[5px]">
      <label class="capitalize label">{{label}}</label>
      <span v-if="required" class="text-body text-danger ml-px">*</span>
    </div>
    <div>
      <input v-model="valueContent" :type="type" class="base-input" :class="readonly ? 'bg-secondary' : ''" :placeholder="placeholder" autocomplete="false" :readonly="readonly" @input="handleInput">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce } from '@/systems/helpers/common'
import { formatterCurrency } from '@/systems/helpers/formatter'

export default Vue.extend({
  name: 'QInputElementPrice',
  props: {
    label: { type: String, default: '' },
    type: { type: String, default: 'tel' }, 
    required: { type: Boolean, default: false},
    readonly: { type: Boolean, default: false},
    placeholder: { type: String, default: null },
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