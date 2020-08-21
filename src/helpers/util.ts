import { type } from "os"

const toString = Object.prototype.toString

// 函数返回值使用类型谓辞，ts在使用的时候会进行类型的判断
export function isDate(val: any): val is Date {
    return toString.call(val) === '[Object Date]'
}

export function isObject(val: any): val is Object {
    return val !== null && typeof val === 'object'
}