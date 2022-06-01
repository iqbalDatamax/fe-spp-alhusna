import Api from '@/systems/services/api'
import { PembayaranSppModel, PembayaranIuranModel, PembayaranHistory, LaporanModel, LaporanEkskulModel } from '@/systems/models/pembayaran'

export class PembayaranService extends Api {
  constructor(http: any) {
    const defaults: any = { message: 'Message service pembayran request basic is empty' }
    super(http, defaults, '/v1')
  }

  searchPembayaran(data:any) {
    const url = `/v1/pembayaran/spp/${data.id_siswa}`
    return { method: 'get', url, params: data.params }
  }

  searchIuran(data: any) {
    const url = `/v1/pembayaran/iuran/${data.id_siswa}`
    return { method: 'get', url, params: data.params }
  }

  createPembayaran(data: any) {
    const url = '/v1/pembayaran/spp'
    return { method: 'post', url, data }
  }

  createPembayaranIuran(data: any) {
    const url = '/v1/pembayaran/iuran'
    return { method: 'post', url, data }
  }

  createPembayaranEkskul(data: any) {
    const url = '/v1/pembayaran/ekskul'
    return { method: 'post', url, data }
  }

  readHistoryPembayaran(data: any) {
    const url = `/v1/pembayaran/history/${data.id_siswa}`
    return { method: 'get', url, params: data.params }
  }

  readLaporanSpp(data: any) {
    const url = `/v1/laporan/spp`
    return { method: 'get', url, params: data }
  }

  readLaporaIuran(data: any) {
    const url = `/v1/laporan/iuran`
    return { method: 'get', url, params: data }
  }

  readLaporaEkskul(data: any) {
    const url = `/v1/laporan/ekskul`
    return { method: 'get', url, params: data }
  }

  getTotalSiswa(data: any) {
    const url = `/v1/total/siswa`
    return { method: 'get', url, params: data }
  }

  getTotalSPP(data: any) {
    const url = `/v1/total/pembayaran`
    return { method: 'get', url, params: data }
  }

  getTotalIuran(data: any) {
    const url = `/v1/total/iuran`
    return { method: 'get', url, params: data }
  }

  request(menu?: string, data?: any): any {
    const _this = this as any
    let configs = {}
    let parser: any = null

    switch (menu) {
      case 'spp-siswa':
        configs = _this.searchPembayaran(data)
        parser = (data: any) => ({ data: new PembayaranSppModel(data) })
        break
      case 'pembayaran':
        configs = _this.createPembayaran(data)
        break
      case 'iuran-siswa':
        configs = _this.searchIuran(data)
        parser = (data: any) => ({ data: new PembayaranIuranModel(data) })
        break
      case 'pembayaran-iuran':
        configs = _this.createPembayaranIuran(data)
        break
      case 'pembayaran-history':
        configs = _this.readHistoryPembayaran(data)
        parser = (data: any) => ({ data: data.data.map((data: any) => new PembayaranHistory(data)) })
        break
      case 'pembayaran-ekskul':
        configs = _this.createPembayaranEkskul(data)
        break
      case 'laporan-spp':
        configs = _this.readLaporanSpp(data)
        parser = (data: any) => ({ data: data.data.map((data: any) => new LaporanModel(data)) })
        break
      case 'laporan-iuran':
        configs = _this.readLaporaIuran(data)
        parser = (data: any) => ({ data: data.data.map((data: any) => new LaporanModel(data)) })
        break
      case 'laporan-ekskul':
        configs = _this.readLaporaEkskul(data)
        parser = (data: any) => ({ data: data.data.map((data: any) => new LaporanEkskulModel(data)) })
        break
      case 'total-siswa':
        configs = _this.getTotalSiswa(data)
        break
      case 'total-spp':
        configs = _this.getTotalSPP(data)
        break
      case 'total-iuran':
        configs = _this.getTotalIuran(data)
        break
    }
    return this.afterRequest(configs, parser)
  }
}