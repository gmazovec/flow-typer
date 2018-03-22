// @flow
const { validatorError } = require('../error')
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
  function nil (value) {
    if (isEmpty(value) || isNil(value)) return null
    throw validatorError(nil, value)
  }
  : TypeValidator<null>
)

exports.undef = (
  function undef (value, _scope = '') {
    if (isEmpty(value) || isUndef(value)) return undefined
    throw validatorError(undef, value, _scope)
  }
  : TypeValidator<void>
)

exports.boolean = (
  function boolean (value, _scope = '') {
    if (isEmpty(value)) return false
    if (isBoolean(value)) return value
    throw validatorError(boolean, value, _scope)
  }
  : TypeValidator<boolean>
)

exports.number = (
  function number (value, _scope = '') {
    if (isEmpty(value)) return 0
    if (isNumber(value)) return value
    throw validatorError(number, value, _scope)
  }
  : TypeValidator<number>
)

exports.string = (
  function string (value, _scope = '') {
    if (isEmpty(value)) return ''
    if (isString(value)) return value
    throw validatorError(string, value, _scope)
  }
  : TypeValidator<string>
)
