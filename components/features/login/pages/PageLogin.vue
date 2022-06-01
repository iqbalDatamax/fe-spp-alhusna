<template>
  <div class="flex flex-row">
    <div class="w-0 lg:w-4/6">
      <card-img-info :image-bg="model.image_bg" />
    </div>
    <div class="w-full lg:w-2/6">
      <form-login :image-logo="model.image_logo" @clickLogin="handleLogin" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ProfilService } from '~/systems/services/service-profil' 

export default Vue.extend({
  components: {
    CardImgInfo: () => import('@/components/features/login/contents/CardImgInfo.vue'),
    FormLogin: () => import('@/components/features/login/contents/FormLogin.vue')
  },
  
  data() {
    return {
      profilService: new ProfilService(this.$axios),
      model: {} as any
    }
  },
  mounted() {
    this.fetchProfil()
  },
  methods: {
    async handleLogin(user: any){
      const _this = this as any
      try {
        const { data } = await _this.$auth.loginWith('local', {
          data: user
        })
        _this.$toast.success(data.message)
        await _this.$router.push('/');
      } catch (error) {
        _this.$toast.error('email atau password salah!')
      }
    },
    async fetchProfil() {
      const result = await this.profilService.request('get-profil')
      if(result.code === 200) {
        const data = result.data
        this.model = data
      }
    },
  }
})
</script>