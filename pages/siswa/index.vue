<template>
  <div>
    <page-default />
  </div>
</template>

<script>
export default {
  name: 'IndexSiswaUserPage',
  components: {
    PageDefault: () => import('@/components/features/siswa/pages/PageListSiswa.vue')
  },
  middleware: ['auth', 'cek-admin'],
  data() {
    return {}
  }
}
</script>