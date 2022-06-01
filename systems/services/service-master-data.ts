import Api from '@/systems/services/api'
import { TahunAjaranModel, KelasModel, PeriodeIuranModel, EkskulModel, BeasiswaModel } from '@/systems/models/master-data'

export class MasterService extends Api {
  constructor(http: any) {
    const defaults: any = { message: 'Message service user request basic is empty' }
    super(http, defaults, '/v1')
  }

  getTahunAjaran() {
    const url = '/v1/periode'
    return { method: 'get', url }
  }

  createTahunAjaran(data:any) {
    const url = '/v1/periode'
    return { method: 'post', url, data }
  }

  getOneTA(id:any){
    const url = `/v1/periode/${id}`
    return { method: 'get', url }
  }

  updateTahunAjaran(data:any) {
    const url = `/v1/periode/${data.id}`
    return { method: 'put', url, data }
  }

  getKelas() {
    const url = '/v1/kelas'
    return { method: 'get', url }
  }

  createKelas(data:any) {
    const url = '/v1/kelas'
    return { method: 'post', url, data }
  }

  getOneKelas(id:any){
    const url = `/v1/kelas/${id}`
    return { method: 'get', url }
  }

  updateKelas(data:any) {
    const url = `/v1/kelas/${data.id}`
    return { method: 'put', url, data }
  }

  getBeasiswa() {
    const url = '/v1/beasiswa'
    return { method: 'get', url }
  }

  createBeasiswa(data:any) {
    const url = '/v1/beasiswa'
    return { method: 'post', url, data }
  }

  getOneBeasiswa(id:any){
    const url = `/v1/beasiswa/${id}`
    return { method: 'get', url }
  }

  updateBeasiswa(data:any) {
    const url = `/v1/beasiswa/${data.id}`
    return { method: 'put', url, data }
  }

  getEkskul() {
    const url = '/v1/ekskul'
    return { method: 'get', url }
  }

  createEkskul(data:any) {
    const url = '/v1/ekskul'
    return { method: 'post', url, data }
  }

  getOneEkskul(id:any){
    const url = `/v1/ekskul/${id}`
    return { method: 'get', url }
  }

  updateEkskul(data:any) {
    const url = `/v1/ekskul/${data.id}`
    return { method: 'put', url, data }
  }

  deleteEkskul(id:any) {
    const url = `/v1/ekskul/${id}`
    return { method: 'delete', url }
  }

  getPeriodeIuran(data: any) {
    const url = '/v1/iuran-wali'
    return { method: 'get', url, params: data }
  }

  getOnePeriodeIuran(id: any) {
    const url = `/v1/iuran-wali/${id}`
    return { method: 'get', url }
  }

  updatePeriodeIuran(data: any) {
    const url = `/v1/iuran-wali/${data.id}`
    return { method: 'put', url, data }
  }

  request(menu?: string, data?: any): any {
    const _this = this as any
    let configs = {}
    let parser: any = null

    switch (menu) {
      case 'list-ta':
        configs = _this.getTahunAjaran()
        parser = (data: any) => ({ data: data.data.map((data: any) => new TahunAjaranModel(data)) })
        break
      case 'create-ta':
        configs = _this.createTahunAjaran(data)
        break
      case 'get-ta':
        configs = _this.getOneTA(data)
        parser = (data: any) => ({ data: new TahunAjaranModel(data.data) })
        break
      case 'update-ta':
        configs = _this.updateTahunAjaran(data)
        break
      case 'list-kelas':
        configs = _this.getKelas()
        parser = (data: any) => ({ data: data.data.map((data: any) => new KelasModel(data)) })
        break
      case 'create-kelas':
        configs = _this.createKelas(data)
        break
      case 'get-kelas':
        configs = _this.getOneKelas(data)
        parser = (data: any) => ({ data: new KelasModel(data.data) })
        break
      case 'update-kelas':
        configs = _this.updateKelas(data)
        break
      case 'list-beasiswa':
        configs = _this.getBeasiswa()
        parser = (data: any) => ({ data: data.data.map((data: any) => new BeasiswaModel(data)) })
        break
      case 'create-beasiswa':
        configs = _this.createBeasiswa(data)
        break
      case 'get-beasiswa':
        configs = _this.getOneBeasiswa(data)
        parser = (data: any) => ({ data: new BeasiswaModel(data.data) })
        break
      case 'update-beasiswa':
        configs = _this.updateBeasiswa(data)
        break

      case 'list-iuran':
        configs = _this.getPeriodeIuran(data)
        parser = (data: any) => ({ data: data.data.map((data: any) => new PeriodeIuranModel(data)) })
        break
      case 'get-iuran':
        configs = _this.getOnePeriodeIuran(data)
        parser = (data: any) => ({ data: new PeriodeIuranModel(data.data) })
        break
      case 'update-iuran':
        configs = _this.updatePeriodeIuran(data)
        break

      case 'list-ekskul':
        configs = _this.getEkskul()
        parser = (data: any) => ({ data: data.data.map((data: any) => new EkskulModel(data)) })
        break
      case 'create-ekskul':
        configs = _this.createEkskul(data)
        break
      case 'get-ekskul':
        configs = _this.getOneEkskul(data)
        parser = (data: any) => ({ data: new EkskulModel(data.data) })
        break
      case 'update-ekskul':
        configs = _this.updateEkskul(data)
        break
      case 'delete-ekskul':
        configs = _this.deleteEkskul(data)
        break
    }
    return this.afterRequest(configs, parser)
  }
}