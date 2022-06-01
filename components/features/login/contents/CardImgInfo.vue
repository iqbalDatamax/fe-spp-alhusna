<template>
  <div>
    <img class="h-screen w-full object-cover opacity-75" :src="`${$axios.defaults.baseURL}/${imageBg}`" alt="login bg"  @error="setDefaultImage">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    imageBg: { type: String, default: null }
  },
  data() {
    return {
      imageDefault: require('~/assets/images/bg-sekolah.jpg')
    }
  },
  methods: {
    setDefaultImage(event: any) { 
      event.target.src = this.imageDefault
    } 
  }
})
</script>