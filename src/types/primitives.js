// @flow
import { validatorError } from '../error.js'
import {
  isNil,
  isUndef,
  isBoolean,
  isNumber,
  isString,
  isObject
} from '../is.js'
import { EMPTY_VALUE } from '../const.js'

import type { NullValidator, VoidValidator, BooleanValidator, NumberValidator, StringValidator } from '..'

function _nil (value: mixed): null {
  if (value === EMPTY_VALUE || isNil(value)) return null
  throw validatorError(nil, value)
}
_nil.type = () => 'null';
_nil.value = () => null;

export const nil = (_nil: NullValidator);

function _undef (value: mixed, _scope: string = ''): void {
  if (value === EMPTY_VALUE || isUndef(value)) return undefined
  throw validatorError(undef, value, _scope)
}
_undef.type = () => 'void'
_undef.value = () => undefined;

export const undef = (_undef: VoidValidator);

function _boolean (value: mixed, _scope: string = ''): boolean {
  if (value === EMPTY_VALUE) return false
  if (isBoolean(value)) return value
  throw validatorError(boolean, value, _scope)
}
_boolean.type = () => 'boolean';
_boolean.value = () => false;

export const boolean = (_boolean: BooleanValidator);

function _number (value: mixed, _scope: string = ''): number {
  if (value === EMPTY_VALUE) return 0
  if (isNumber(value)) return value
  throw validatorError(number, value, _scope)
}
_number.type = () => 'number';
_number.value = () => 0;

export const number = (_number: NumberValidator);

function _string (value: mixed, _scope: string = ''): string {
  if (value === EMPTY_VALUE) return ''
  if (isString(value)) return value
  throw validatorError(string, value, _scope)
}
_string.type = () => 'string';
_string.value = () => '';

export const string = (_string: StringValidator);
