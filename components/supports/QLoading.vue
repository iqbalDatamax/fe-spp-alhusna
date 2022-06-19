<template>
	<div v-if="loading" class="loading-page">
    <div class="flex flex-col mt-48 items-center ">
      <img :src="loadingGif" alt="">
      <h4 class="text-black font-semibold">Sedang memuat data</h4>
    </div>
	</div>
</template>

<script>
export default{
	props: {
		loading: { type: Boolean, default: false }
	},
  data() {
    return {
      loadingGif: require('~/assets/images/loading.gif')
    }
  },
}
</script>

<style scoped>
.loading-page {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(255 255 255 / 90%);
	z-index: 100;
}
</style>