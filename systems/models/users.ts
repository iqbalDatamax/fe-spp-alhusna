import { dateFormatter } from '@/systems/helpers/formatter'

export class AdminModel {
  id: number
  nama: string
  email: string
  status: string
  peran: string
  terdaftar: any

  constructor(data: any) {
    data = data || {}
    this.id = data.id || null
    this.nama = data.nama || null
    this.email = data.email || null
    this.status = data.status || null
    this.peran = data.peran || null
    this.terdaftar = dateFormatter('date', data.createdAt || null)
  }
}

export class GuruModel {
  id: number
  nama: string
  email: string
  status: string
  jenis_kelamin: string
  telpon: any
  terdaftar: any

  constructor(data: any) {
    data = data || {}
    this.id = data.id || null
    this.nama = data.nama || null
    this.email = data.email || null
    this.status = data.status || null
    this.telpon = data.telpon || null
    this.jenis_kelamin = data.jenis_kelamin === 'perempuan' ? 'Perempuan' : 'Laki-laki' || null
    this.terdaftar = dateFormatter('date', data.createdAt || null)
  }
}

export class SiswaModel {
  isChecked: boolean
  id: number
  nama: string
  nis: any
  email: any
  tempatLahir: string
  tanggalLahir: any
  status: string
  jk: string
  alamat: string
  ttl: any
  terdaftar: any
  photo: string
  namaKelas: string
  telpon: any

  constructor(data: any) {
    data = data || {}
    this.isChecked = false
    this.id = data.id || null
    this.nama = data.nama || null
    this.nis = data.nis || null
    this.email = data.email || null
    this.telpon = data.telpon || null
    this.tempatLahir = data.tempat_lahir || null
    this.jk = data.jenis_kelamin || null
    this.ttl = data.tanggal_lahir ? `${data.tempat_lahir}, ${dateFormatter('date', data.tanggal_lahir)}` : null 
    this.tanggalLahir = data.tanggal_lahir.slice(0, 10) || null
    this.status = data.status || null
    this.alamat = data.alamat || null
    this.terdaftar = dateFormatter('date', data.createdAt || null)
    this.photo = data.photo || null
    this.namaKelas = data?.siswa_kelas ? data?.siswa_kelas[0]?.kelas_periode?.kela?.nama_kelas : null
  }
}

export class SiswaPeriodeModel {
  id: number
  itemSearch: string

  constructor(data: any) {
    data = data || {}
    this.id = data.id || null
    this.itemSearch = `${data.nis} - ${data.nama.toUpperCase()}` || ''
  }
}

export class AdminModelPaginate {
  currentPage: number
  totalItems: number
  totalPages: number
  dataAdmin: AdminModel

  constructor(data: any) {
    data = data || {}
    this.currentPage = data.currentPage || 0
    this.totalItems = data.totalItems || 0
    this.totalPages = data.totalPages || 0
    this.dataAdmin = data.data && data.data.length > 0 ? data.data.map((item: any) => new AdminModel(item)) : []
  }
}

export class GuruModelPaginate {
  currentPage: number
  totalItems: number
  totalPages: number
  dataGuru: GuruModel

  constructor(data: any) {
    data = data || {}
    this.currentPage = data.currentPage || 0
    this.totalItems = data.totalItems || 0
    this.totalPages = data.totalPages || 0
    this.dataGuru = data.data && data.data.length > 0 ? data.data.map((item: any) => new GuruModel(item)) : []
  }
}

export class SiswaModelPaginate {
  currentPage: number
  totalItems: number
  totalPages: number
  dataSiswa:SiswaModel

  constructor(data: any) {
    data = data || {}
    this.currentPage = data.currentPage || 0
    this.totalItems = data.totalItems || 0
    this.totalPages = data.totalPages || 0
    this.dataSiswa = data.data && data.data.length > 0 ? data.data.map((item: any) => new SiswaModel(item)) : []
  }
}