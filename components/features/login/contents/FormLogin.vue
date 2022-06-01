<template>
  <div class="bg-primary lg:bg-gray-100 items-center min-h-screen overflow-hidden px-10 lg:px-20 pt-16">
    <div class="flex justify-center">
      <!-- <img class="h-[150px]" src="~/assets/images/logotutwurihandayani.png" alt="tuturi logo"> -->
      <img class="h-[150px] mb-2" :src="`${$axios.defaults.baseURL}/${imageLogo}`" alt="tuturi logo" @error="setDefaultImage">
    </div>
    <p class="text-sm text-left">Selamat datang kembali</p>
    <h1 class="text-xl font-semibold text-left text-white lg:text-black">Silahkan Login</h1>
    <div class="w-full mt-6">
      <div class="">
        <label for="email" class="block text-left text-sm font-medium text-white lg:text-black">
          Email/NIS
        </label>
        <div class="mt-1 flex rounded-md shadow-sm">
          <input v-model="auth.email" type="text" class="base-input" placeholder="xxxx-xx@gmail.com / xxxxxxx">
        </div>
      </div>
      <div class="mt-5">
        <label for="password" class="block text-left text-sm font-medium text-white lg:text-black">
          Password
        </label>
        <div class="mt-1 flex rounded-md shadow-sm">
          <input v-model="auth.password" :type="showPassword ? 'text' : 'password'" class="base-input" placeholder="Input passwordd">
          <button class="bg-white px-1 -ml-0.5 rounded-r border-black-light border-t border-b border-r" @click="showPassword = !showPassword">
            <i v-if="showPassword" class="fas fa-eye-slash cursor-pointer mx-1"></i>
            <i v-else class="fas fa-eye cursor-pointer mx-1"></i>
          </button>
        </div>
      </div>
      <div class="text-center mt-8">
        <button class="btn-primary bg-primary-dark border border-black-light w-full" @click="$emit('clickLogin', auth)">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    imageLogo: { type: String, default: null }
  },
  data() {
    return {
      auth: {
        email: null,
        password: null
      },
      showPassword: false,
      imageDefault: require("~/assets/images/logotutwurihandayani.png")
    }
  },
  methods: {
    setDefaultImage(event: any) { 
      event.target.src = this.imageDefault
    } 
  }
})
</script>