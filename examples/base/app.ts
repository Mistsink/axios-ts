/* tslint:disable */
import axios, { AxiosError } from '../../src/index'

/**
 * base get url test
 *
 axios({
    method: 'get',
    url: '/base/get',
    params: {
      foo: ['bar', 'baz']
    }
  })

 axios({
    method: 'get',
    url: '/base/get',
    params: {
      foo: {
        bar: 'baz'
      }
    }
  })

 const date = new Date()

 axios({
    method: 'get',
    url: '/base/get',
    params: {
      date
    }
  })

 axios({
    method: 'get',
    url: '/base/get',
    params: {
      foo: '@:$, '
    }
  })

 axios({
    method: 'get',
    url: '/base/get',
    params: {
      foo: 'bar',
      baz: null
    }
  })

 axios({
    method: 'get',
    url: '/base/get#hash',
    params: {
      foo: 'bar'
    }
  })

 axios({
    method: 'get',
    url: '/base/get?foo=bar',
    params: {
      bar: 'baz'
    }
  })
 */
/*
test post url

axios({
    method: 'POST',
    url: '/base/post',
    data: {
      foo: 'bar'
    }
  }
)

axios({
  method: 'POST',
  url: '/base/buffer',
  data: new Int32Array([1, 2, 3])
})
*/

/**
 * test responseObject
 */

axios({
  method: 'post',
  url: '/base/post',
  data: {
    foo: 'bar'
  }
})

axios({
  method: 'POST',
  url: '/base/response',
  data: {
    foo: 'bar'
  }
}).then(res => {
  console.log(res)
})

axios({
  method: 'POST',
  url: '/base/response-type',
  responseType: 'json',
  data: {
    foo: 'bar'
  }
}).then(res => {
  console.log(res)
})
axios({
  method: 'POST',
  url: '/base/error',
  responseType: 'json',
  data: {
    foo: 'bar'
  }
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
  console.log(e.config)
  console.log(e.request)
})

// test generic(泛型)
interface User {
  name: string
  age: number
}

interface Result<T = any> {
  code: string,
  message: string,
  result: T
}

axios<Result<User>>('/base').then(({ data }) => data.result)
