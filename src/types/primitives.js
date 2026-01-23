// @flow
import { validatorError } from '../error.js'
import {
  isNull,
  isUndef,
  isBoolean,
  isNumber,
  isString,
  isObject
} from '../is.js'

import type { NullValidator, VoidValidator, BooleanValidator, NumberValidator, StringValidator, TypeAssertError, AssertionContext } from '..'

function _nil (value: mixed): null {
  if (isNull(value)) return null
  throw validatorError(nil, value)
}
_nil.type = () => 'null';
_nil.value = () => null;

export const nil = (_nil: NullValidator);

function _undef (value: mixed, _scope: string = ''): void {
  if (isUndef(value)) return undefined
  throw validatorError(undef, value, _scope)
}
_undef.type = () => 'void'
_undef.value = () => undefined;

export const undef = (_undef: VoidValidator);

function toBoolean (value: mixed, ctx: AssertionContext): boolean {
  if (isBoolean(value)) {
    return value
  }
  ctx.assertion = false
  return Boolean()
}

function _boolean (value: mixed, _scope: string = '', err: ?TypeAssertError[], _ctx: AssertionContext = {}): boolean {
  const v = toBoolean(value, _ctx)
  if (_ctx.assertion === false) {
    if (err) {
      err.push({ expected: 'boolean', actual: typeof value, scope: _scope })
    } else {
      throw validatorError(boolean, value, _scope)
    }
  }
  return v
}
_boolean.type = () => 'boolean';
_boolean.value = () => false;

export const boolean = (_boolean: BooleanValidator);

function toNumber (value: mixed, ctx: AssertionContext): number {
  if (isNumber(value)) {
    return value
  }
  if (isString(value)) {
    const v = Number.parseFloat(value)
    if (!Number.isNaN(v)) {
      return v
    }
  }
  ctx.assertion = false
  return Number()
}

function _number (value: mixed, _scope: string = '', err: ?TypeAssertError[], _ctx: AssertionContext = {}): number {
  const v = toNumber(value, _ctx)
  if (_ctx.assertion === false) {
    if (err) {
      err.push({ expected: 'number', actual: typeof value, scope: _scope })
    } else {
      throw validatorError(number, value, _scope)
    }
  }
  return v
}
_number.type = () => 'number';
_number.value = () => 0;

export const number = (_number: NumberValidator);

function toString (value: mixed, ctx: AssertionContext) {
  if (isString(value)) {
    return value
  }
  if (isNumber(value)) {
    return String(value)
  }
  ctx.assertion = false
  return String()
}

function _string (value: mixed, _scope: string = '', err: ?TypeAssertError[], _ctx: AssertionContext = {}): string {
  const v = Array.isArray(value) && value.length === 1
    ? toString(value[0], _ctx)
    : toString(value, _ctx);
  if (_ctx.assertion === false) {
    if (err) {
      err.push({ expected: 'string', actual: typeof value, scope: _scope }) 
    } else {
      throw validatorError(string, value, _scope)
    }
  }
  return v
}
_string.type = () => 'string';
_string.value = () => '';

export const string = (_string: StringValidator);
