import RestClient from './restClient'
import { httpMethods } from '../constants'
import { DEFAULT_PAGE_SIZE } from '../constants/common'

export default class BaseApi {
  constructor() {
    this.Methods = httpMethods
  }

  handlePagination(data, isUsePaging) {
    if (!isUsePaging) return data

    const per_page = data.pageSize || DEFAULT_PAGE_SIZE
    const page = data.page || 1

    delete data.pageSize
    delete data.page

    return {
      ...data,
      page,
      per_page
    }
  }

  execute(
    method,
    endpoint,
    headers = undefined,
    isAuthen = true,
    body = undefined,
    isUsePaging = false
  ) {
    if (method === this.Methods.GET) {
      body = this.handlePagination(body || {}, isUsePaging)
    }

    const restClient = new RestClient(method, endpoint)
    return restClient.execute(headers, body, isAuthen)
  }
}
