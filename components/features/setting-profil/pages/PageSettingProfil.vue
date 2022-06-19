<template>
  <div>
    <content-body title="Setting Profil Sekolah" icon="fas fa-building">
      <div class="mt-6">
        <form-profil :model="model" @clickButton="handleSubmit" /> 
      </div>
    </content-body>
    <q-loading class="print:hidden" :loading="loading" />
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
      model: {} as any,
      loading:  false
    }
  },
  mounted() {
    this.fetchProfil()
  },
  methods: {
    async fetchProfil() {
      this.loading = true
      const result = await this.profilService.request('get-profil')
      if(result.code === 200) {
        const data = result.data
        this.model = data
        this.loading = false
      }
    },
    async handleSubmit() {
      this.loading = true
      const _this = this as any
      const result = await this.profilService.request( this.model?.id ? 'edit-profil' : 'create-profil', this.model)
      if(result.code === 200 || result.code === 201) {
        _this.$toast.success(result.message)
        this.fetchProfil()
        this.loading = true
      } else {
        _this.$toast.error(result.message)
      }
    }
  }
})
</script>