// @flow
import { convertValue, assertContext } from '../type.js';
import { getType } from '../utils.js'
import {
  isNull,
  isUndef,
  isBoolean,
  isNumber,
  isString,
} from '../is.js'

import type { NullValidator, VoidValidator, BooleanValidator, NumberValidator, StringValidator, TypeAssertError, AssertionContext } from '..'

function toNil (value: mixed, ctx: AssertionContext, convert: boolean): null {
  if (isNull(value)) {
    return null
  }
  if (convert) {
    if (value === "null") {
      return null;
    }
  }
  ctx.assertion = false
  return null
}

function _nil (value: mixed, _scope: string = '', err?: TypeAssertError[], _ctx?: AssertionContext = {}): null {
  const v = convertValue(toNil, value, _ctx, false)
  assertContext(nil.name, getType(nil), value, _scope, err, _ctx);
  return v
}
_nil.type = () => 'null';
_nil.value = () => null;

export const nil = (_nil: NullValidator);

function toUndef (value: mixed, ctx: AssertionContext, convert: boolean): void {
  if (convert) {
    if (value === "undefined") {
      return undefined;
    }
  }
  if (!isUndef(value)) {
    ctx.assertion = false
  }
}

function _undef (value: mixed, _scope: string = '', err?: TypeAssertError[], _ctx?: AssertionContext = {}): void {
  convertValue(toUndef, value, _ctx, false);
  assertContext(undef.name, getType(undef), value, _scope, err, _ctx);
}
_undef.type = () => 'void'
_undef.value = () => undefined;

export const undef = (_undef: VoidValidator);

function toBoolean (value: mixed, ctx: AssertionContext, convert: boolean): boolean {
  if (isBoolean(value)) {
    return value
  }
  if (convert) {
    if (value === "true" || value === "false") {
      return JSON.parse(value)
    }
  }
  ctx.assertion = false
  return Boolean()
}

function _boolean (value: mixed, _scope: string = '', err?: TypeAssertError[], _ctx?: AssertionContext = {}): boolean {
  const v = convertValue(toBoolean, value, _ctx, false)
  assertContext(boolean.name, getType(boolean), value, _scope, err, _ctx);
  return v
}
_boolean.type = () => 'boolean';
_boolean.value = () => false;

export const boolean = (_boolean: BooleanValidator);

function toNumber (value: mixed, ctx: AssertionContext, convert: boolean): number {
  if (isNumber(value)) {
    return value
  }
  if (convert) {
    if (isString(value)) {
      const v = Number.parseFloat(value)
      if (!Number.isNaN(v)) {
        return v
      }
    }
    if (isNull(value)) {
      return NaN
    }
  }
  ctx.assertion = false
  return Number()
}

function _number (value: mixed, _scope: string = '', err?: TypeAssertError[], _ctx?: AssertionContext = {}, _convert?: boolean = false): number {
  const v = convertValue(toNumber, value, _ctx, _convert);
  assertContext(number.name, getType(number), value, _scope, err, _ctx);
  return v
}
_number.type = () => 'number';
_number.value = () => 0;

export const number = (_number: NumberValidator);

function toString (value: mixed, ctx: AssertionContext, convert: boolean) {
  if (isString(value)) {
    return value
  }
  if (convert) {
    if (isNumber(value)) {
      return String(value)
    }
  }
  ctx.assertion = false
  return String()
}

function _string (value: mixed, _scope: string = '', err?: TypeAssertError[], _ctx?: AssertionContext = {}, _convert?: boolean = false): string {
  const v = convertValue(toString, value, _ctx, _convert);
  assertContext(string.name, getType(string), value, _scope, err, _ctx);
  return v
}
_string.type = () => 'string';
_string.value = () => '';

export const string = (_string: StringValidator);

