<template>
  <div>
    <page-default />
  </div>
</template>

<script>
export default {
  name: 'IndexUbahPasswordPage',
  components: {
    PageDefault: () => import('@/components/features/ubah-password/Pages/PageUbahPassword.vue')
  },
  middleware: 'auth',
  data() {
    return {}
  }
}
</script>