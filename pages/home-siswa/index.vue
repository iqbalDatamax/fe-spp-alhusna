<template>
  <div>
    <page-default />
  </div>
</template>

<script>
export default {
  name: 'IndexHomeSiswa',
  components: {
    PageDefault: () => import('@/components/features/siswa-login/home-siswa/PageHomeSiswa.vue')
  },
  layout: 'siswa',
  middleware: ['auth', 'cek-siswa'],
  data() {
    return {}
  }
}
</script>