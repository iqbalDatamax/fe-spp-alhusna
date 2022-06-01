<template>
  <div>
    <page-default />
  </div>
</template>

<script>
export default {
  name: 'IndexProfilPage',
  components: {
    PageDefault: () => import('@/components/features/setting-profil/pages/PageSettingProfil.vue')
  },
  middleware: 'auth',
  data() {
    return {}
  }
}
</script>