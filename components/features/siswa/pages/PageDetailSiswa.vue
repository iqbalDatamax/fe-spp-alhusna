<template>
  <div>
    <content-body title="Tambah Siswa" icon="fas fa-users">
      <p class="text-body text-black cursor-pointer" @click="$router.back()"><i class="fas fa-chevron-left mr-2"></i>Kembali</p>
      <div class="mt-6">
        <form-siswa :model="model" @clickButton="handleSubmit" @changeCheck="handleCheck" /> 
      </div>
    </content-body>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { UsersService } from '~/systems/services/service-users' 
import { MasterService } from '~/systems/services/service-master-data' 

export default Vue.extend({
  components: {
    FormSiswa: () => import('@/components/features/siswa/contents/FormSiswa.vue'),
    ContentBody: () => import('@/components/features/public/body-content/BodyContent.vue'),
  },
  data() {
    return {
      usersService: new UsersService(this.$axios),
      masterService: new MasterService(this.$axios),
      model: {} as any
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize() {
      const _this = this as any
      const params = _this.$route.params?.id
      if(params === 'create') {
        this.model = {}
      } else {
        const result = await _this.usersService.request('get-user', params, 'siswa')
        if(result.code === 200) {
          const data = result.data
          this.model = {
            id: data.id || null,
            nama: data.nama || null,
            nis: data.nis || null,
            peran: 'siswa',
            tempat_lahir: data.tempatLahir || null,
            tanggal_lahir: data.tanggalLahir || null,
            alamat: data.alamat || null,
            status: data.status || null,
            jenis_kelamin: data.jk || null,
            email: data.email || null,
            telpon: data.telpon || null,
            photo: data.photo || null,
            edit: true
          }
        }
      }
    },
    handleCheck() {
      const tgl = this.model?.tanggal_lahir || null
      const psd = tgl ? tgl.replaceAll('-', '') : null
      if(this.model.check) {
        Object.assign(this.model, { password: psd, confirmPassword: psd})
      }
    },
    async handleSubmit(menu:string) {
      const _this = this as any
      const params = _this.$route.params?.id
      let result: any = {}

      if(menu === 'close'){
        this.$router.back()
        return
      }
      if(params === 'create') {
        if(this.model.password !== this.model.confirmPassword){
          _this.$toast.error('Password yang anda masukkan tidak sama')
          return
        }
        const data = await Object.assign(this.model, {peran: 'siswa'})
        result = await this.usersService.request('create-user', data)
      } else {
        result = await this.usersService.request('edit-user', this.model)
      }

      if(result.code === 200 || result.code === 201) {
        _this.$toast.success(result.message)
        _this.$router.back()
      } else {
        _this.$toast.error(result.message)
      }
    }
  }
})
</script>