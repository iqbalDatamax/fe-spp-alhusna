<template>
  <div>
    <page-default />
  </div>
</template>

<script>
export default {
  name: 'IndexSppSiswa',
  components: {
    PageDefault: () => import('@/components/features/siswa-login/spp-siswa/PageSpp.vue')
  },
  layout: 'siswa',
  middleware: ['auth', 'cek-siswa'],
  data() {
    return {}
  }
}
</script>