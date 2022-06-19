<template>
  <div>
    <page-default />
  </div>
</template>

<script>
export default {
  name: 'IndexTentangSekolah',
  components: {
    PageDefault: () => import('@/components/features/siswa-login/tentang-sekolah/PageTentang.vue')
  },
  layout: 'siswa',
  middleware: ['auth', 'cek-siswa'],
  data() {
    return {}
  }
}
</script>