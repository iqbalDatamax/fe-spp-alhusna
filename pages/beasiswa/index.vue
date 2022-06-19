<template>
  <div>
    <page-default />
  </div>
</template>

<script>
export default {
  name: 'IndexBeasiswaUserPage',
  components: {
    PageDefault: () => import('@/components/features/master-data/pages/PageBeasiswa.vue')
  },
  middleware: ['auth', 'cek-admin'],
  data() {
    return {}
  }
}
</script>