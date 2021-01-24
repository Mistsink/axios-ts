import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'
import { processHeaders } from './helpers/headers'
import { transformRequest, transformResponse } from './helpers/data'

const defaults: AxiosRequestConfig = {
  url: 'get',
  timeout: 0,
  headers: {
    commons: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  transformRequest: [
    function(headers: any, data: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ]
}

const methodsWithoutData = ['get', 'delete', 'head', 'options']

methodsWithoutData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
