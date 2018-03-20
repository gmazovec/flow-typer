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
  (v: mixed): null => {
    if (isEmpty(v) || isNil(v)) return null
    throw error('null', typeof v)
  }

exports.undef =
  (v: mixed): void => {
    if (isEmpty(v) || isUndef(v)) return undefined
    throw error('undefined', typeof v)
  }

exports.boolean =
  (v: mixed): boolean => {
    if (isEmpty(v)) return false
    if (isBoolean(v)) return v
    throw error('boolean', typeof v)
  }

exports.number =
  (v: mixed): number => {
    if (isEmpty(v)) return 0
    if (isNumber(v)) return v
    throw error('number', typeof v)
  }

exports.string =
  (v: mixed): string => {
    if (isEmpty(v)) return ''
    if (isString(v)) return v
    throw error('string', typeof v)
  }
