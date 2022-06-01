export class ProfilModel {
  id: any
  nama: string
  alamat: string
  email: string
  telpon: string
  website: string
  kode_pos: string
  pimpinan: string
  nip_pimpinan: string
  faximail: string
  jenis: string
  akreditasi: string
  image_logo: string
  image_bg: string

  constructor(data: any) {
    data = data || {}
    this.id = data?.id || null
    this.nama = data?.nama || null
    this.alamat = data?.alamat || null
    this.email = data?.email || null
    this.telpon = data?.telpon || null
    this.website = data?.website || null
    this.kode_pos = data?.kode_pos || null
    this.pimpinan = data?.pimpinan || null
    this.nip_pimpinan = data?.nip_pimpinan || null
    this.faximail = data?.faximail || null
    this.jenis = data?.jenis || null
    this.akreditasi = data?.akreditasi || null
    this.image_logo = data?.logo || null
    this.image_bg = data?.background || null
  }
}