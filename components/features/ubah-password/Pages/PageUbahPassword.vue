<template>
  <div>
    <content-body title="Ubah Password Admin" icon="fas fa-key">
      <form-ubah-password :model="model" :admin="lists" @clickButton="handleSubmit" />
    </content-body>
    <q-loading class="print:hidden" :loading="loading" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { UsersService } from '~/systems/services/service-users'


export default Vue.extend({
  components: {
    ContentBody: () => import('@/components/features/public/body-content/BodyContent.vue'),
    FormUbahPassword: () => import('@/components/features/ubah-password/contents/FormUbahPassword.vue')
  },
  data() {
    return {
      usersService: new UsersService(this.$axios),
      model: {
        peran: 'admin'
      } as any,
      lists: [] as any,
      loading: false
    }
  },
  watch: {
    'model.peran'() {
      this.initialized()
    }
  },
  mounted() {
    this.initialized()
  },
  methods: {
    initialized() {
      this.fetchAdmin()
    },
    async fetchAdmin() {
      this.loading = true
      if(this.model.peran === 'admin') {
        const result = await this.usersService.request('list-admin', {})
        const data = result.data
        this.lists = data.dataAdmin
      } else if (this.model.peran === 'guru') {
        const result = await this.usersService.request('list-guru', {})
        const data = result.data
        this.lists = data.dataGuru
      } else {
        const result = await this.usersService.request('list-siswa', {})
        const data = result.data
        this.lists = data.dataSiswa
        console.log(this.lists)
      }
      this.loading = false
    },
    async handleSubmit() {
      this.loading = true
      const _this = this as any
      const data = {
        email: this.model?.email,
        password_baru: this.model?.password_baru
      }
      const result = await  this.usersService.request('ubah-password', data)
      if(result.code === 200 || result.code === 201) {
        _this.$toast.success(result.message)
        this.model = {}
        this.loading = false
      }
    }
  }
})
</script>