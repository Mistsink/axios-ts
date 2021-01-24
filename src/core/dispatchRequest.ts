import { processHeaders } from '../helpers/headers'
import xhr from './xhr'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponseData } from '../helpers/data'

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => transformResponse(res))
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  const { data } = config
  return transformRequest(data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { data, headers = {} } = config
  return processHeaders(headers, data)
}

function transformResponse(res: AxiosResponse): any {
  res.data = transformResponseData(res.data)
  return res
}

export default dispatchRequest
