<template>
  <div>
    <page-default />
  </div>
</template>

<script>
export default {
  name: 'IndexAdminUserPage',
  components: {
    PageDefault: () => import('@/components/features/login/pages/PageLogin.vue')
  },
  layout: 'login',
  data() {
    return {}
  }
}
</script>