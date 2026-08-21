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
      value = value.trim();
      const v = Number.parseFloat(value)
      if (!Number.isNaN(v) && v.toString() === value) {
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

function toInt (value: mixed, ctx: AssertionContext, convert: boolean): number {
  if (isNumber(value)) {
    if (Number.parseInt(value, 10) === value) {
      return value;
    }
  }
  if (convert) {
    if (isString(value)) {
      value = value.trim();
      const v = Number.parseInt(value, 10);
      if (v.toString() === value) {
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

const uint32Value = uint16Value * uint16Value;

function _uint32 (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, _convert?: boolean = false): number {
  const v = _number(value, _scope, err, _ctx, _convert);
  if (_ctx.assertion !== false) {
    if (v < 0 || v > uint32Value) {
      _ctx.assertion = false;
      assertContext(_uint32.name, getType(_uint32), v, _scope, err, _ctx.assertion);
      return Number();
    }
  }
  return v;
}

_uint32.type = () => "number.uint32";
_uint32.value = () => 0;

_number.uint32 = (_uint32: NumberValidator);

const int8MaxValue = uint8Value / 2;
const int8MinValue = -int8MaxValue;

function _int8 (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, _convert?: boolean = false): number {
  const v = _number(value, _scope, err, _ctx, _convert);
  if (_ctx.assertion !== false) {
    if (v < int8MinValue || v > int8MaxValue) {
      _ctx.assertion = false;
      assertContext(_int8.name, getType(_int8), v, _scope, err, _ctx.assertion);
      return Number();
    }
  }
  return v;
}

_int8.type = () => "number.int8";
_int8.value = () => 0;

_number.int8 = (_int8: NumberValidator);

const int16MaxValue = (uint16Value / 2) - 1;
const int16MinValue = -(uint16Value / 2);

function _int16 (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, _convert?: boolean = false): number {
  const v = _number(value, _scope, err, _ctx, _convert);
  if (_ctx.assertion !== false) {
    if (v < int16MinValue || v > int16MaxValue) {
      _ctx.assertion = false;
      assertContext(_int16.name, getType(_int16), v, _scope, err, _ctx.assertion);
      return Number();
    }
  }
  return v;
}

_int16.type = () => "number.int16";
_int16.value = () => 0;

_number.int16 = (_int16: NumberValidator);

const int32MaxValue = (uint32Value / 2) - 1;
const int32MinValue = -(uint32Value / 2);

function _int32 (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, _convert?: boolean = false): number {
  const v = _number(value, _scope, err, _ctx, _convert);
  if (_ctx.assertion !== false) {
    if (v < int32MinValue || v > int32MaxValue) {
      _ctx.assertion = false;
      assertContext(_int32.name, getType(_int32), v, _scope, err, _ctx.assertion);
      return Number();
    }
  }
  return v;
}

_int32.type = () => "number.int32";
_int32.value = () => 0;

_number.int32 = (_int32: NumberValidator);

const timeMaxValue = 86.4e14;
const timeMinValue = -timeMaxValue;

function _time (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, _convert?: boolean = false): number {
  const v = _number(value, _scope, err, _ctx, _convert);
  if (_ctx.assertion !== false) {
    if (v < timeMinValue || v > timeMaxValue) {
      _ctx.assertion = false;
      assertContext(_time.name, getType(_time), v, _scope, err, _ctx.assertion);
      return Number();
    }
  }
  return v;
}

_time.type = () => "number.time";
_time.value = () => 0;

_number.time = (_time: NumberValidator);

