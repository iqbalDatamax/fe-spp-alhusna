<template>
  <div>
    <page-default />
  </div>
</template>

<script>
export default {
  name: 'IndexLaporanPage',
  components: {
    PageDefault: () => import('@/components/features/laporan/pages/PageLaporanIuran.vue')
  },
  middleware: ['auth', 'cek-tu'],
  data() {
    return {}
  }
}
</script>