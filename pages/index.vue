<template>
  <div>
    <page-default />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  components: {
    PageDefault: () => import('@/components/features/home/PageHome.vue')
  },
  middleware: ['auth', 'cek-tu'],
  data() {
    return {}
  }
}
</script>
