<template>
  <div>
    <page-default />
  </div>
</template>

<script>
export default {
  name: 'IndexAdminUserPage',
  components: {
    PageDefault: () => import('@/components/features/admin/list-admin/Pages/PageListAdmin.vue')
  },
  middleware: 'auth',
  data() {
    return {}
  }
}
</script>