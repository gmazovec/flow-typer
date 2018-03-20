// @flow

const { error } = require('../utils')
const {
  isEmpty,
  isNil,
  isUndef,
  isBoolean,
  isNumber,
  isString,
  isObject
} = require('../is')

exports.nil =
  function nil (v: mixed): null {
    if (isEmpty(v) || isNil(v)) return null
    throw error('null', typeof v)
  }

exports.undef =
  function undef (v: mixed): void {
    if (isEmpty(v) || isUndef(v)) return undefined
    throw error('undefined', typeof v)
  }

exports.boolean =
  function boolean (v: mixed): boolean {
    if (isEmpty(v)) return false
    if (isBoolean(v)) return v
    throw error('boolean', typeof v)
  }

exports.number =
  function number (v: mixed): number {
    if (isEmpty(v)) return 0
    if (isNumber(v)) return v
    throw error('number', typeof v)
  }

exports.string =
  function string (v: mixed): string {
    if (isEmpty(v)) return ''
    if (isString(v)) return v
    throw error('string', typeof v)
  }
