// @flow
const { validatorError } = require('../error')
const {
  isNil,
  isUndef,
  isBoolean,
  isNumber,
  isString,
  isObject
} = require('../is')
const { EMPTY_VALUE } = require('../const')

import type { TypeValidator } from '..'

function nil (value: mixed): null {
  if (value === EMPTY_VALUE || isNil(value)) return null
  throw validatorError(nil, value)
}
nil.type = () => 'null';

exports.nil = (nil: TypeValidator<null>);

function undef (value: mixed, _scope: string = ''): void {
  if (value === EMPTY_VALUE || isUndef(value)) return undefined
  throw validatorError(undef, value, _scope)
}
undef.type = () => 'void'

exports.undef = (undef: TypeValidator<void>)

function boolean (value: mixed, _scope: string = ''): boolean {
  if (value === EMPTY_VALUE) return false
  if (isBoolean(value)) return value
  throw validatorError(boolean, value, _scope)
}
boolean.type = () => 'boolean';

exports.boolean = (boolean: TypeValidator<boolean>);

function number (value: mixed, _scope: string = ''): number {
  if (value === EMPTY_VALUE) return 0
  if (isNumber(value)) return value
  throw validatorError(number, value, _scope)
}
number.type = () => 'number';

exports.number = (number: TypeValidator<number>);

function string (value: mixed, _scope: string = ''): string {
  if (value === EMPTY_VALUE) return ''
  if (isString(value)) return value
  throw validatorError(string, value, _scope)
}
string.type = () => 'string';

exports.string = (string: TypeValidator<string>);

