<template>
  <div>
    <page-default />
  </div>
</template>

<script>
export default {
  name: 'IndexPembayaranEkskulUserPage',
  components: {
    PageDefault: () => import('@/components/features/pembayaran-ekskul/pages/PagePembayaranEkskul.vue')
  },
  middleware: ['auth', 'cek-tu'],
  data() {
    return {}
  }
}
</script>