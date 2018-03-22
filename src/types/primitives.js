// @flow

const { validatorError } = require('../utils')
const {
  isEmpty,
  isNil,
  isUndef,
  isBoolean,
  isNumber,
  isString,
  isObject
} = require('../is')

import type { TypeValidator } from '..'

exports.nil = (
  function nil (v) {
    if (isEmpty(v) || isNil(v)) return null
    throw validatorError(nil, v)
  }
  : TypeValidator<null>
)

exports.undef = (
  function undef (v, _scope = '') {
    if (isEmpty(v) || isUndef(v)) return undefined
    throw validatorError(undef, v, _scope)
  }
  : TypeValidator<void>
)

exports.boolean = (
  function boolean (v, _scope = '') {
    if (isEmpty(v)) return false
    if (isBoolean(v)) return v
    throw validatorError(boolean, v, _scope)
  }
  : TypeValidator<boolean>
)

exports.number = (
  function number (v, _scope = '') {
    if (isEmpty(v)) return 0
    if (isNumber(v)) return v
    throw validatorError(number, v, _scope)
  }
  : TypeValidator<number>
)

exports.string = (
  function string (v, _scope = '') {
    if (isEmpty(v)) return ''
    if (isString(v)) return v
    throw validatorError(string, v, _scope)
  }
  : TypeValidator<string>
)
