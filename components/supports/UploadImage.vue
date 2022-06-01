<template>
  <div>
    <label class="capitalize label mb-2">{{label}}</label>
    <client-only>
      <image-uploader
        :id="keyUm"
        :debug="1"
        :quality="0.6"
        :preview="false"
        accept="image/*"
        @input="setImage"
      >
        <label slot="upload-label" :for="keyUm" class="text-gray-700">
          <figure>
            <i class="fas fa-camera text-2xl border rounded px-6 py-2 mt-2"></i>
          </figure>
        </label>
      </image-uploader>
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    label: { type: String, default: null },
    keyUm: { type: String, default: null },
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
    setImage(evt: any): void {
      this.$set(this, 'valueContent', evt)
		}
  }
})
</script>

<style>
  /* sesui dengan key yang didaftarkan */
  #bg, #logo {
    display: none;
  }
</style>

