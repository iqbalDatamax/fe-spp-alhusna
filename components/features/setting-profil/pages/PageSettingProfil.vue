<template>
  <div>
    <content-body title="Setting Profil Sekolah" icon="fas fa-building">
      <div class="mt-6">
        <form-profil :model="model" @clickButton="handleSubmit" /> 
      </div>
    </content-body>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ProfilService } from '~/systems/services/service-profil' 

export default Vue.extend({
  components: {
    ContentBody: () => import('@/components/features/public/body-content/BodyContent.vue'),
    FormProfil: () => import('@/components/features/setting-profil/contents/FormProfil.vue')
  },
  data(){
    return {
      profilService: new ProfilService(this.$axios),
      model: {} as any
    }
  },
  mounted() {
    this.fetchProfil()
  },
  methods: {
    async fetchProfil() {
      const result = await this.profilService.request('get-profil')
      if(result.code === 200) {
        const data = result.data
        this.model = data
      }
    },
    async handleSubmit() {
      const _this = this as any
      const result = await this.profilService.request( this.model?.id ? 'edit-profil' : 'create-profil', this.model)
      if(result.code === 200 || result.code === 201) {
        _this.$toast.success(result.message)
        this.fetchProfil()
      } else {
        _this.$toast.error(result.message)
      }
    }
  }
})
</script>