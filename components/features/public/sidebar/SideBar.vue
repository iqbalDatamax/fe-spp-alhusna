<template>
	<div class="print:hidden">
		<aside class="sticky top-0 bg-white h-screen overflow-y-auto border-r w-64 shadow-xl">
      <content-side :side-list="sideList" class="mt-20" />
	  </aside>
	</div>
</template>

<script>
export default {
  name: 'SideBar',
  components: {
    ContentSide: () => import('@/components/features/public/sidebar/ContentSide.vue')
  },
  data() {
    return {
      sideList : [
        { id: 'dashboard', name: 'dashboard', icon: 'fas fa-tv', path: '/' },
        { id: 'pembayaranspp', name: 'pembayaran SPP', icon: 'far fa-list-alt', path: '/pembayaran-spp' },
        { id: 'pembayaran', name: 'pembayaran lainya', icon: 'fas fa-tasks', open: false, list: [
            { id: 'pembayaran-tahunan', name: 'Iuran Tahunan', path: '/iuran-tahunan' },
            { id: 'pembayaran-ekskul', name: 'Ekstrakurikuler', path: '/pembayaran-ekskul' }
          ]
        },
        { id: 'laporan', name: 'Laporan-laporan', icon: 'fas fa-file-signature', open: false, list: [
            { id: 'lap-spp', name: 'laporan pembayaran spp', path: '/laporan/spp' },
            { id: 'lap-iuran', name: 'laporan iuran tahunan', path: '/laporan/iuran' },
            { id: 'lap-ekskul', name: 'laporan pembayaran ekskul', path: '/laporan/ekskul' }
          ]
        },
        { id: 'master-data', name: 'master data', icon: 'fas fa-server', open: false, list: [
            { id: 'beasiswa', name: 'Atur Penerima Beasiswa', path: '/beasiswa' },
            { id: 'kelas', name: 'kelas', path: '/kelas' },
            { id: 'ta', name: 'tahun ajaran & iuran', path: '/tahun-ajaran' },
            { id: 'ekskul', name: 'Ekstrakurikuler', path: '/ekskul' }
          ]
        },
        { id: 'master-user', name: 'data user', icon: 'fas fa-users', open: false, list: [
            { id: 'datasiswa', name: 'data siswa', path: '/siswa' },
            { id: 'dataguru', name: 'data guru', path: '/guru' }
          ]
        },
        { id: 'profil', name: 'setting profil', icon: 'fas fa-building', path: '/setting-profil' },
        { 
          id: 'admin', name: 'admin', icon: 'fas fa-chalkboard-teacher', open: false, list: [
            { id: 'user-list', name: 'admin', path: '/admin' },
            { id: 'user-pass', name: 'password admin', path: '/ubah-password' }
          ]
        }
      ]
    }
  }
}
</script>
