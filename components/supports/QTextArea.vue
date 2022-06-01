<template>
  <div>
    <div v-if="label" class="mb-[5px]">
      <label class="capitalize label">{{label}}</label>
      <span v-if="required" class="text-body text-danger ml-px">*</span>
    </div>
    <div>
      <textarea v-model="valueContent" class="base-input h-[60px] pt-1" :placeholder="placeholder"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'QTextAreaElement',
  props: {
    label: { type: String, default: ''},
    type: { type: String, default: 'text' },
    required: { type: Boolean, default: false},
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
  }
})
</script>