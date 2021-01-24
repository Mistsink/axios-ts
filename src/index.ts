/**
 * 原入口代码放置axios.ts中，该文件默认导出axios，同时又导出types/index.ts以供外部使用
 */
import axios from './axios'

export * from './types'

export default axios
