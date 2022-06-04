<template>
  <div>
    <page-default />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'IndexUbahPasswordPage',
  components: {
    PageDefault: () => import('@/components/features/ubah-password/Pages/PageUbahPassword.vue')
  },
  middleware: 'auth',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  mounted(){
    this.checkSuperAdmin()
  },
  methods: {
    checkSuperAdmin() {
      if(this.loggedInUser.peran !== 'super-admin') {
        this.$toast.error('Mohon maaf kamu tidak memiliki akses halaman ini')
        this.$router.replace('/')
      }
    }
  }
}
</script>