// @flow

import { convertValue, assertContext } from "../type.js";
import { getType } from "../utils.js";
import {
  isNull,
  isNumber,
  isString,
} from "../is.js";

import type { NumberValidator, TypeAssertError, AssertionContext } from "..";

function toNumber (value: mixed, ctx: AssertionContext, convert: boolean): number {
  if (isNumber(value)) {
    return value;
  }
  if (convert) {
    if (isString(value)) {
      const v = Number.parseFloat(value)
      if (!Number.isNaN(v)) {
        return v;
      }
    }
    if (isNull(value)) {
      return NaN;
    }
  }
  ctx.assertion = false
  return Number();
}

function _number (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, _convert?: boolean = false): number {
  const v = convertValue(toNumber, value, _ctx, _convert);
  assertContext(number.name, getType(number), value, _scope, err, _ctx.assertion);
  return v;
}
_number.type = () => "number";
_number.value = () => 0;

export const number = (_number: NumberValidator);

function _tonumber (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, _convert?: boolean = true): number {
  const v = convertValue(toNumber, value, _ctx, true);
  assertContext(number.name, getType(number), value, _scope, err, _ctx.assertion);
  return v;
}
_tonumber.type = () => "number";
_tonumber.value = () => 0;

export const tonumber = (_tonumber: NumberValidator);

const uint8Value = 256;

function _uint8 (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, _convert?: boolean = false): number {
  const v = _number(value, _scope, err, _ctx, _convert);
  if (_ctx.assertion !== false) {
    if (v < 0 || v > uint8Value) {
      _ctx.assertion = false;
      assertContext(_uint8.name, getType(_uint8), v, _scope, err, _ctx.assertion);
      return Number();
    }
  }
  return v;
}

_uint8.type = () => "number.uint8";
_uint8.value = () => 0;

_number.uint8 = (_uint8: NumberValidator);

const uint16Value = uint8Value * uint8Value;

function _uint16 (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, _convert?: boolean = false): number {
  const v = _number(value, _scope, err, _ctx, _convert);
  if (_ctx.assertion !== false) {
    if (v < 0 || v > uint16Value) {
      _ctx.assertion = false;
      assertContext(_uint16.name, getType(_uint16), v, _scope, err, _ctx.assertion);
      return Number();
    }
  }
  return v;
}

_uint16.type = () => "number.uint16";
_uint16.value = () => 0;

_number.uint16 = (_uint16: NumberValidator);


