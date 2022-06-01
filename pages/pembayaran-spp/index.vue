<template>
  <div>
    <page-default />
  </div>
</template>

<script>
export default {
  name: 'IndexPembayaranUserPage',
  components: {
    PageDefault: () => import('@/components/features/pembayaran-spp/pages/PagePembayaranSpp.vue')
  },
  middleware: 'auth',
  data() {
    return {}
  }
}
</script>