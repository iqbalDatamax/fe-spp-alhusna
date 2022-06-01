<template>
  <div>
    <page-default />
  </div>
</template>

<script>
export default {
  name: 'IndexEkskulUserPage',
  components: {
    PageDefault: () => import('@/components/features/master-data/pages/PageEkskul.vue')
  },
  middleware: 'auth',
  data() {
    return {}
  }
}
</script>