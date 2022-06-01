import Api from '@/systems/services/api'
import { ProfilModel } from '@/systems/models/profil'

export class ProfilService extends Api {
  constructor(http: any) {
    const defaults: any = { message: 'Message service user request basic is empty' }
    super(http, defaults, '/v1')
  }

  postCreateProfil(data: any) {
    const url = `/v1/profil`
    return { method: 'post', url, data }
  }

  getOneProfil() {
    const url = '/v1/profil'
    return { method: 'get', url }
  }

  putUpdateProfil(data: any) {
    const url = `/v1/profil/${data.id}`
    return { method: 'put', url, data }
  }

  request(menu?: string, data?: any): any {
    const _this = this as any
    let configs = {}
    let parser: any = null

    switch (menu) {
      case 'create-profil':
        configs = _this.postCreateProfil(data)
        break
      case 'get-profil':
        configs = _this.getOneProfil()
        parser = (data: any) => ({ data: new ProfilModel(data.data) })
        break
      case 'edit-profil':
        configs = _this.putUpdateProfil(data)
        break
    }

    return this.afterRequest(configs, parser)
  }
}