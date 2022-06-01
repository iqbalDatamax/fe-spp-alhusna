<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">
      <div class="flex flex-row gap-2 mb-4" :class="invalid?'items-center':'items-end'">
        <ValidationProvider v-slot="{ errors }" rules="required" class="w-4/5">
          <q-input v-model="valueContent" :label="label" :placeholder="placeholder" />
          <span class="text-xs text-danger">{{ errors[0] }}</span>
        </ValidationProvider>
        <button class="w-1/5 h-[40px]" :class="invalid ? 'btn-disable': 'btn-primary'" :disabled="invalid" @click="$emit('clickButton')"> Save </button>
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
    value: { type: String, default: null },
    label: { type: String, default: null },
    placeholder: { type: String, default: null }
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