<template>
  <div>
    <page-default />
  </div>
</template>

<script>
export default {
  name: 'IndexSppSiswa',
  components: {
    PageDefault: () => import('@/components/features/siswa-login/profil-siswa/PageProfil.vue')
  },
  layout: 'siswa',
  middleware: ['auth', 'cek-siswa'],
  data() {
    return {}
  }
}
</script>