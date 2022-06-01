<template>
  <div>
    <page-default />
  </div>
</template>

<script>
export default {
  name: 'IndexIuranTahunanPage',
  components: {
    PageDefault: () => import('@/components/features/iuran-tahunan/Pages/PageIuranTahunan.vue')
  },
  middleware: 'auth',
  data() {
    return {}
  }
}
</script>