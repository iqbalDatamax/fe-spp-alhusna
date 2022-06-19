import { GetSiswaModel } from '@/systems/models/users'
import { dateFormatter, formatterCurrency } from '@/systems/helpers/formatter'

export class SppModel {
  id: string
  isChecked: boolean
  isDisable: boolean
  bulan: string
  ansuran: any
  potongan: any
  total: any
  tangalBayar: any
  status : string

  constructor(data:any) {
    data = data || {}
    this.id = data.bulan || null
    this.isChecked = false
    this.isDisable = data.status === 'lunas'
    this.bulan = data.bulan || null
    this.potongan = formatterCurrency(data.potongan || null) || '-'
    this.total = formatterCurrency(data.ansuran - data.potongan || null) || 0
    this.ansuran = formatterCurrency(data.ansuran || null) || 0
    this.tangalBayar = dateFormatter('date', data.tanggal_bayar || null) || '-'
    this.status = data.status || null
  }
}

export class PembayaranSppModel {
  dataSiswa: GetSiswaModel
  dataSpp: SppModel
  idSpp:any

  constructor(data:any) {
    data = data || {}
    this.dataSiswa =  new GetSiswaModel(data.user)
    this.dataSpp = data.spp && data.spp.length > 0 ? data.spp.map((item: any) => new SppModel(item)) : []
    this.idSpp = data.id_spp || null
  }
}

export class IuranModel {
  iuran: any
  ansuran: any
  potongan: any
  sisaBayar: any
  status: string

  constructor(data: any) {
    data = data || {}
    this.iuran = data?.iuran || 0
    this.ansuran = data?.ansuran || 0
    this.potongan = data?.potongan || 0
    this.sisaBayar = data?.sisa || 0
    this.status = data?.status || null
  }
}
export class PembayaranIuranModel {
  dataSiswa: GetSiswaModel
  dataIuran: IuranModel

  constructor(data: any) {
    this.dataSiswa = new GetSiswaModel(data.user)
    this.dataIuran = new IuranModel(data.data_iuran)
  }
}

export class PembayaranHistory {
  iuran: any
  tanggalBayar: any

  constructor(data: any) {
    data = data || {}
    this.iuran = formatterCurrency(data.iuran || null)
    this.tanggalBayar = dateFormatter('date', data.tanggal_bayar || null)
  }
}

export class LaporanModel {
  id: string
  bulan: string
  iuran: any
  potongan: any
  total: any
  tanggalBayar: any
  namaSiswa: string
  nisSiswa: any
  status: string
  petugas: string
  totalAnsuran: any
  sisaBayar: any

  constructor(data:any) {
    data = data || {}
    this.id = data.bulan || null
    this.bulan = data.bulan || null
    this.iuran = formatterCurrency(data.ansuran || data.iuran) || '-'
    this.potongan = formatterCurrency(data.potongan || null) || '-'
    this.total = formatterCurrency(data.ansuran - data.potongan || null)
    this.tanggalBayar = dateFormatter('date', data.tanggal_bayar || null) || '-'
    this.totalAnsuran = formatterCurrency(data.total_ansuran || null) || '-'
    this.sisaBayar = formatterCurrency(data.sisa_bayar || null) || 0
    this.namaSiswa = data?.nama_siswa || null
    this.nisSiswa = data?.nis || null
    this.status = data?.status || null
    this.petugas = data?.petugas || '-'
  }
}

export class LaporanEkskulModel {
  iuran: any
  deskripsi: string
  ekskul: string
  namaSiswa: string
  nisSiswa: any
  petugas: string
  tanggalBayar: any

  constructor(data:any) {
    data = data || {}
    this.iuran = formatterCurrency(data.ansuran || null)
    this.deskripsi = data.deskripsi || null
    this.ekskul = data.ekskul || null
    this.namaSiswa = data.nama_siswa || null
    this.nisSiswa = data?.nis || null
    this.petugas = data.petugas || null
    this.tanggalBayar = dateFormatter('date', data.tanggal_bayar || null) || '-'
  }
}