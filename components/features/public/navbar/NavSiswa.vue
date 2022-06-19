<template>
  <div>
    <div class="flex justify-between p-3.5 items-center">
      <div class="flex flex-row gap-2.5 items-center">
        <img :src="`${$axios.defaults.baseURL}/${loggedInUser.photo}`" alt="photo siswa" class="h-[35px] rounded-full border" @error="setDefaultImage">
        <nuxt-link to="/profile-siswa" class="text-primary-dark font-medium text-sm capitalize cursor-pointer" >Hallo {{loggedInUser.nama}}!</nuxt-link>
      </div>
      <i class="fas fa-sign-out-alt text-xl text-black cursor-pointer" @click="logout"></i>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
  data() {
    return {
      imageDefault: require('~/assets/images/default-person.png')
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  methods: {
    async logout(){
      const _this = this as any
      await _this.$auth.logout()
      _this.$router.push('/login')
      _this.$toast.success('Logout berhasil')
    },
    setDefaultImage(event: any) { 
      event.target.src = this.imageDefault
    } 
  }
})
</script>