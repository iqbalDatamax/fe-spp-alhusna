class Api {
  protected http: any
  protected attributes: any
  protected subPath: string

  constructor(http: any, defaults: any = {}, path: string) {
    this.http = http
    this.attributes = defaults
    this.subPath = path
  }

  getAttributes(): any {
    return this.attributes
  }

  protected afterRequest(configs: any, parser: any): any {
    const _this = this as any
    return new Promise((resolve) => {
      _this
        .http(Object.assign(configs, { timeout: _this.timeout }))
        .then((result: any) => {
          const code = result?.status || 0
          if ([200, 201].includes(Number(code))) {
            const data = result?.data || null
            const extended = typeof parser === 'function' ? parser(data) : data
            resolve(Object.assign({ code }, extended))
          } else {
            resolve(Object.assign({ code }, _this.getAttributes()))
          }
        })
        .catch((error: any) => {
          const result = error?.response || null
          if (result) {
            const code = result?.status || 0
            const data = result?.data || null
            resolve(Object.assign({ statusCode: code, message: error.toString(), error: true }, data))
          } else {
            resolve({ message: error.toString(), error: true })
          }
        })
    })
  }
}

export default Api