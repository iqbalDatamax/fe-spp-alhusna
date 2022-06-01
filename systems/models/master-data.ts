export class TahunAjaranModel {
  id: number
  tahunAjaran: string

  constructor(data: any) {
    data = data || {}
    this.id = data.id || null
    this.tahunAjaran = data.tahun_ajaran || null
  }
}

export class KelasModel {
  id: number
  namaKelas: string
  status: string

  constructor(data:any) {
    data = data || {}
    this.id = data.id || null
    this.namaKelas = data.nama_kelas || null
    this.status = data.status || null
  }
}

export class BeasiswaModel {
  id: number
  namaSiswa: string
  idSiswa: any
  nis: any
  tahunAjaran: string
  idPeriode: any
  potonganSpp: any
  potonganIuran: any

  constructor(data:any) {
    data = data || {}
    this.id = data.id || null
    this.namaSiswa = data.user?.nama || null
    this.idSiswa = data.id_siswa || null
    this.nis = data.user?.nis || null
    this.idPeriode = data.id_periode || null
    this.tahunAjaran = data.periode?.tahun_ajaran || null
    this.potonganSpp = data.potongan_spp || null
    this.potonganIuran = data.potongan_iuran || null
  }
}

export class EkskulModel {
  id: number
  namaEkskul: string
  deskripsi: string

  constructor(data: any) {
    data = data || {}
    this.id = data.id || null
    this.namaEkskul = data.nama_ekskul || null
    this.deskripsi = data.description || null
  }
}

export class PeriodeIuranModel {
  id: number
  iuranSpp: any
  iuranTahunan: any
  namaKelas: string
  tahunAjaran: string
  idPeriode: any
  idKelas: any

  constructor(data:any) {
    data = data || {}
    this.id = data.id || null
    this.iuranSpp = data.iuran_spp || null
    this.iuranTahunan = data.iuran_tahunan || null
    this.tahunAjaran = data?.periode?.tahun_ajaran || null
    this.namaKelas = data?.kela?.nama_kelas || null
    this.idPeriode = data?.id_periode || null
    this.idKelas = data?.id_kelas || null
  }
}