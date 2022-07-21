import { create } from 'apisauce'

import { httpMethods } from '../constants'
import { cookie } from '../utils'

import Response from './response'

const BaseUrl = process.env.REACT_APP_API_ROOT

class RestClient {
  constructor(method, endpoint, timeout = 15000) {
    this.method = method
    this.endpoint = endpoint
    this.timeout = timeout
    this.TAG = 'RestClient'
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
    this.BASE_URL = BaseUrl
  }

  setBaseUrl(url) {
    this.BASE_URL = url
  }

  setHeaders(headers) {
    if (headers !== null) {
      Object.keys(headers).map(key => {
        this.headers[key] = headers[key]
        return null
      })
    }
  }

  setTimeout(timeout) {
    this.timeout = timeout
  }

  async execute(headers, body, isAuthen = false) {
    if (isAuthen) {
      const token = cookie.getToken()
      if (token) {
        this.headers.Authorization = `Bearer ${token}`
      }
    }

    if (headers !== undefined && headers !== null) {
      this.headers = Object.assign(this.headers, headers)
    }

    if (body instanceof FormData) {
      this.headers['Content-Type'] = 'multipart/form-data'
    }

    this.restClient = create({
      baseURL: this.BASE_URL,
      headers: this.headers,
      timeout: this.timeout
    })

    let response = new Response({})
    switch (this.method) {
      case httpMethods.GET: {
        return this.restClient
          .get(this.endpoint, body)
          .then(res => {
            if (this.BASE_URL === BaseUrl) {
              return Response.createResponseData(res || {}, body)
            }

            return Response.createCustomResponseData(res)
          })
          .catch(e => {
            console.log(e)
            return response
          })
      }
      case httpMethods.POST: {
        return this.restClient
          .post(this.endpoint, body)
          .then(res => {
            if (this.BASE_URL === BaseUrl) {
              return Response.createResponseData(res || {})
            }

            response = Response.createCustomResponseData(res)
            return response
          })
          .catch(e => {
            console.log(e)
            return response
          })
      }
      case httpMethods.PUT: {
        return this.restClient
          .put(this.endpoint, body)
          .then(res => {
            if (this.BASE_URL === BaseUrl) {
              return Response.createResponseData(res || {})
            }

            return Response.createCustomResponseData(res)
          })
          .catch(e => {
            console.log(e)
            return response
          })
      }
      case httpMethods.DELETE: {
        return this.restClient
          .delete(this.endpoint, {}, { data: body })
          .then(res => {
            if (this.BASE_URL === BaseUrl) {
              return Response.createResponseData(res || {})
            }

            return Response.createCustomResponseData(res)
          })
          .catch(e => {
            console.log(e)
            return response
          })
      }

      case httpMethods.PATCH: {
        return this.restClient
          .patch(this.endpoint, body)
          .then(res => {
            if (this.BASE_URL === BaseUrl) {
              return Response.createResponseData(res || {})
            }
            return Response.createCustomResponseData(res)
          })
          .catch(e => {
            console.log(e)
            return response
          })
      }

      default: {
        return response
      }
    }
  }
}

export default RestClient
