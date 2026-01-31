// @flow
import { validatorError, validatorTypeError } from '../error.js'
import { getType } from '../utils.js'
import {
  isNull,
  isUndef,
  isBoolean,
  isNumber,
  isString,
  isObject
} from '../is.js'

import type { NullValidator, VoidValidator, BooleanValidator, NumberValidator, StringValidator, TypeAssertError, AssertionContext } from '..'

function convertValue <T> (typeFn: (mixed, AssertionContext) => T, value: mixed, ctx: AssertionContext): T {
  const v = typeFn(value, ctx);
  if (ctx.assertion === false) {
    ctx.assertion = true;
    if (Array.isArray(value) && value.length === 1) {
      return typeFn(value[0], ctx);
    }
    if (isObject(value)) {
      const keys = Object.keys(value);
      if (keys.length === 1) {
        return typeFn(value[keys[0]], ctx);
      }
    }
    ctx.assertion = false;
  }
  return v;
}

export function assertContext (name: string, type: string, value: mixed, scope: string, err: ?TypeAssertError[], ctx: AssertionContext): void {
  if (ctx.assertion === false) {
    if (err) {
      err.push({ expected: type, actual: typeof value, scope: scope })
    } else {
      throw validatorTypeError(name, type, value, scope)
    }
  }
}

function toNil (value: mixed, ctx: AssertionContext): null {
  if (isNull(value)) {
    return null
  }
  ctx.assertion = false
  return null
}

function _nil (value: mixed, _scope: string = '', err: ?TypeAssertError[], _ctx: AssertionContext = {}): null {
  const v = convertValue(toNil, value, _ctx)
  assertContext(nil.name, getType(nil), value, _scope, err, _ctx);
  return v
}
_nil.type = () => 'null';
_nil.value = () => null;

export const nil = (_nil: NullValidator);

function toUndef (value: mixed, ctx: AssertionContext): void {
  if (!isUndef(value)) {
    ctx.assertion = false
  }
}

function _undef (value: mixed, _scope: string = '', err: ?TypeAssertError[], _ctx: AssertionContext = {}): void {
  convertValue(toUndef, value, _ctx);
  assertContext(undef.name, getType(undef), value, _scope, err, _ctx);
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
  const v = convertValue(toBoolean, value, _ctx)
  assertContext(boolean.name, getType(boolean), value, _scope, err, _ctx);
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
  if (isNull(value)) {
    return NaN
  }
  ctx.assertion = false
  return Number()
}

function _number (value: mixed, _scope: string = '', err: ?TypeAssertError[], _ctx: AssertionContext = {}): number {
  const v = convertValue(toNumber, value, _ctx);
  assertContext(number.name, getType(number), value, _scope, err, _ctx);
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
  const v = convertValue(toString, value, _ctx);
  assertContext(string.name, getType(string), value, _scope, err, _ctx);
  return v
}
_string.type = () => 'string';
_string.value = () => '';

export const string = (_string: StringValidator);
