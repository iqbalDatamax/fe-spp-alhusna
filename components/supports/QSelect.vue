<template>
  <div>
    <div v-if="label" class="mb-[5px]">
      <label class="capitalize label">{{label}}</label>
      <span v-if="required" class="text-body text-danger ml-px">*</span>
    </div>
    <div class="relative">
      <input v-model="valueContent" :type="type" class="base-input" :placeholder="placeholder" @click="optionCard = !optionCard">
      <div v-if="optionCard" class="absolute top-1 border border-black-light bg-white rounded shadow mt-10 w-full z-10" @click="optionCard = !optionCard">
        <div v-if="options.length > 0" class="h-48 overflow-y-auto">
          <div v-for="(dt, i) in options" :key="i" class="p-2 hover:bg-secondary-light text-body text-black">{{dt.text}}</div>
        </div>
        <div v-else class="py-4 px-2 text-body text-danger text-center">
          data tidak ditemukan
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name:"QSelectElement",
  props: {
    label: { type: String, default: ''},
    type: { type: String, default: 'text' },
    required: { type: Boolean, default: false},
    placeholder: { type: String, default: null },
    value: { type: [Number, String], default: null },
    options: { type: Array, default: () => [] }
  },
  data() {
    return {
      optionCard: false
    }
      
  },
  computed: {
    valueContent: {
			get(): any {
				return (this as any).value
			}
		},
  }
})
</script>