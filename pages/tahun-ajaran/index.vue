<template>
  <div>
    <page-default />
  </div>
</template>

<script>
export default {
  name: 'IndexTAUserPage',
  components: {
    PageDefault: () => import('@/components/features/master-data/pages/PagePeriodeIuran.vue')
  },
  middleware: 'auth',
  data() {
    return {}
  }
}
</script>