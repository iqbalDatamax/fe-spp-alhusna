import Api from '@/systems/services/api'
import { AdminModelPaginate, AdminModel, GuruModelPaginate, GuruModel, SiswaModelPaginate, GetSiswaModel, SiswaPeriodeModel } from '@/systems/models/users'

export class UsersService extends Api {
  constructor(http: any) {
    const defaults: any = { message: 'Message service user request basic is empty' }
    super(http, defaults, '/v1')
  }

  getAdminList(data: any) {
    const url = '/v1/admin'
    return { method: 'get', url, params: data }
  }

  getGuruList(data: any) {
    const url = '/v1/guru'
    return { method: 'get', url, params: data }
  }

  getSiswaList(data: any) {
    const url = '/v1/siswa'
    return { method: 'get', url, params: data }
  }

  getSiswaPeriode(data: any) {
    const url = '/v1/siswa-periode'
    return { method: 'get', url, params: data }
  }

  postCreateUsers(data: any) {
    const url = `/v1/user`
    return { method: 'post', url, data }
  }

  getOneUsers(id:any) {
    const url = `/v1/user/${id}`
    return { method: 'get', url }
  }

  putUpdateUsers(data: any) {
    const url = `/v1/user/${data.id}`
    return { method: 'put', url, data }
  }

  deleteUsers(id:any) {
    const url = `/v1/user/${id}`
    return { method: 'delete', url }
  }

  AturKelasSiswa(data: any) {
    const url = `/v1/atur-kelas`
    return { method: 'post', url, data }
  }

  SiswaTelahLulus(data: any) {
    const url = `/v1/siswa-lulus`
    return { method: 'post', url, data }
  }

  UbahPassword(data: any) {
    const url = `/v1/ubah-password`
    return { method: 'post', url, data }
  }

  UploadFile(data: any) {
    const url = `/v1/uploadandcreatesiswa`
    return { method: 'post', url, data }
  }

  request(menu?: string, data?: any, type?:any): any {
    const _this = this as any
    let configs = {}
    let parser: any = null

    switch (menu) {
      case 'list-admin':
        configs = _this.getAdminList(data)
        parser = (data: any) => ({ data: new AdminModelPaginate(data.data) })
        break
      case 'list-guru':
        configs = _this.getGuruList(data)
        parser = (data: any) => ({ data: new GuruModelPaginate(data.data) })
        break
      case 'list-siswa':
        configs = _this.getSiswaList(data)
        parser = (data: any) => ({ data: new SiswaModelPaginate(data.data) })
        break
      case 'siswa-aktif':
        configs = _this.getSiswaPeriode(data)
        parser = (data: any) => ({ data: data.data.map((data: any) => new SiswaPeriodeModel(data)) })
        break
      case 'create-user':
        configs = _this.postCreateUsers(data)
        break
      case 'get-user':
        configs = _this.getOneUsers(data)
        if(type === 'admin') {
          parser = (data: any) => ({ data: new AdminModel(data.data) })
        } else if (type === 'guru') {
          parser = (data: any) => ({ data: new GuruModel(data.data) })
        } else if (type === 'siswa') {
          parser = (data: any) => ({ data: new GetSiswaModel(data.data) })
        }
        break
      case 'delete-user':
        configs = _this.deleteUsers(data)
        break
      case 'edit-user':
        configs = _this.putUpdateUsers(data)
        break
      case 'atur-kelas':
        configs = _this.AturKelasSiswa(data)
        break
      case 'siswa-lulus':
        configs = _this.SiswaTelahLulus(data)
        break
      case 'ubah-password':
        configs = _this.UbahPassword(data)
        break
      case 'file':
        configs = _this.UploadFile(data)
        break
    }

    return this.afterRequest(configs, parser)
  }
}