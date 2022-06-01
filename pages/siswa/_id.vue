<template>
  <div>
    <page-default />
  </div>
</template>

<script>
export default {
  name: 'IndexSiswaDetailUserPage',
  components: {
    PageDefault: () => import('@/components/features/siswa/pages/PageDetailSiswa.vue')
  },
  middleware: 'auth',
  data() {
    return {}
  }
}
</script>