<template>
  <div>
    <page-default />
  </div>
</template>

<script>
export default {
  name: 'IndexKelasUserPage',
  components: {
    PageDefault: () => import('@/components/features/master-data/pages/PageKelas.vue')
  },
  middleware: ['auth', 'cek-admin'],
  data() {
    return {}
  }
}
</script>