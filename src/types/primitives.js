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
  function nil (value): null {
    if (isEmpty(value) || isNil(value)) return null
    throw validatorError(nil, value)
  }
  : TypeValidator<null>
)

function undef (value: mixed, _scope: string = ''): void {
  if (isEmpty(value) || isUndef(value)) return undefined
  throw validatorError(undef, value, _scope)
}
undef.type = () => 'void'
exports.undef = (undef: TypeValidator<void>)

exports.boolean = (
  function boolean (value, _scope = ''): boolean {
    if (isEmpty(value)) return false
    if (isBoolean(value)) return value
    throw validatorError(boolean, value, _scope)
  }
  : TypeValidator<boolean>
)

exports.number = (
  function number (value, _scope = ''): number {
    if (isEmpty(value)) return 0
    if (isNumber(value)) return value
    throw validatorError(number, value, _scope)
  }
  : TypeValidator<number>
)

exports.string = (
  function string (value, _scope = ''): string {
    if (isEmpty(value)) return ''
    if (isString(value)) return value
    throw validatorError(string, value, _scope)
  }
  : TypeValidator<string>
)
