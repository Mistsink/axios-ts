import { deepMerge, isPlainObject } from './util'
import { Method } from '../types'

function normolizeHeadersName(headers: any, normolizeName: string): void {
  if (!headers) {
    return
  }

  Object.keys(headers).forEach(name => {
    if (name !== normolizeName && name.toUpperCase() === normolizeName.toUpperCase()) {
      headers[normolizeName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normolizeHeadersName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

export function parseHeaders(headers: string): any {
  const parsed = Object.create(null)

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()

    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return
  }

  headers = deepMerge(headers, headers.common, headers[method])

  const propsToDelete = ['get', 'head', 'delete', 'options', 'post', 'put', 'patch']

  propsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
