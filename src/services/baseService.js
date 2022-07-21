import { get } from 'lodash'

export default class BaseService {
  handleError(error) {
    throw error
  }

  handleResponse(response) {
    const statusCode = get(response, 'statusCode', 200)
    const message = get(response, ['data', 'message'], '')
    if (!(statusCode >= 200 && statusCode <= 299)) {
      throw new Error(message)
    }
    return response
  }
}
