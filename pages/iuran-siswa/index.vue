<template>
  <div>
    <page-default />
  </div>
</template>

<script>
export default {
  name: 'IndexIuranSiswa',
  components: {
    PageDefault: () => import('@/components/features/siswa-login/iuran-siswa/PageIuran.vue')
  },
  layout: 'siswa',
  middleware: ['auth', 'cek-siswa'],
  data() {
    return {}
  }
}
</script>