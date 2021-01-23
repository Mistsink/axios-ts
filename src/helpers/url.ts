import { isDate, isObject } from './util'

/**
 * 常见字符编码
 * @param val
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params: any): string {
  if (!params) {
    return url
  }

  // 思路：
  //     将参数转换为字符串数组，最后通过join方法生成url后面的查询参数
  const parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]

    if (val === null || val === undefined) {
      // 注意这里的return并不会跳出forEach方法，只会跳出该次循环
      return
    }

    let values: string[]

    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    console.log(values)
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  // 进行参数拼接
  if (serializedParams) {
    // 去除hash标识#
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
