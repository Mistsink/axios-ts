import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  /**
   * 将Axios类实例上的方法复制给instance对象，那么instance就成了聚合方法的混合对象
   */
  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
