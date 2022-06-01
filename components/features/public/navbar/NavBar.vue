<template>
  <nav class="fixed w-full h-16 top-0 bg-white shadow-md print:hidden">
    <div class="flex justify-between items-center mx-6 mt-4">
      <div class="flex flex-row items-center text-primary-dark text-h5">
        <i class="fas fa-bars mr-3 cursor-pointer" @click="$emit('clickNavBar')"></i>
        <h1 class="capitalize font-semibold">Sistem Pembayaran SPP</h1>
      </div>
      <!-- dropdown  -->
      <div class="relative text-black">
        <button class="flex items-center outline-none focus:outline-none" @click="toggleDropDown = !toggleDropDown">
          <p class="mr-2 text-body font-medium capitalize">Hi, {{loggedInUser.nama}}</p>
          <i class="fas fa-angle-down"></i>
        </button>
        <div v-if="toggleDropDown" class="bg-white rounded shadow absolute mt-12 top-0 right-0 z-50 w-48">
          <div class="block text-black text-body">
            <!-- <nuxt-link to="/admin/myprofile" class="w-full px-3 py-2 hover:bg-primary-light hover:no-underline" type="button">
              <i class="fas fa-user-alt mr-2"></i>
              Akun
            </nuxt-link>
            <hr>
            <nuxt-link to="/admin/edit-mypassword" class="w-full px-3 py-2 hover:bg-primary-light hover:no-underline" type="button">
              <i class="fas fa-key mr-2"></i>
              Ubah Password
            </nuxt-link>
            <hr> -->
            <div class="w-full px-3 py-2 hover:bg-primary-light cursor-pointer hover:no-underline" type="button" @click="logout">
              <i class="fas fa-sign-out-alt mr-2"></i>
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavbarCard',
  data() {
    return {
      toggleDropDown: false
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  methods: {
    async logout(){
      await this.$auth.logout()
      this.$router.push('/login')
      this.$toast.success('Logout berhasil')
    },
  }
}
</script>