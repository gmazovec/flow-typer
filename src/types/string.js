// @flow

import { assertContext, convertValue } from "../type.js";
import { getType } from "../utils.js";
import { isString, isNumber } from "../is.js";

import type { AssertionContext, TypeAssertError, StringValidator } from "../index.js";

function toString (value: mixed, ctx: AssertionContext, convert: boolean) {
  if (isString(value)) {
    return value;
  }
  if (convert) {
    if (isNumber(value)) {
      return String(value);
    }
  }
  ctx.assertion = false;
  return String();
}

const _string = function string (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, _convert?: boolean = false): string {
  const v = convertValue(toString, value, _ctx, _convert);
  assertContext(string.name, getType(string), value, _scope, err, _ctx.assertion);
  return v;
}
_string.type = () => "string";
_string.value = () => "";

export const string = (_string: StringValidator);

const _tostring = function string (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, _convert?: boolean = true): string {
  const v = convertValue(toString, value, _ctx, true);
  assertContext(string.name, getType(string), value, _scope, err, _ctx.assertion);
  return v;
}
_tostring.type = () => "string";
_tostring.value = () => "";

export const tostring = (_tostring: StringValidator);

function _bigint (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, _convert?: boolean = false): string {
  const v = _string(value, _scope, err, _ctx, _convert);
  if (_ctx.assertion !== false) {
    if (/^\s*\d*\s*$/.test(v) === false) {
      _ctx.assertion = false;
      assertContext(_bigint.name, getType(_bigint), v, _scope, err, _ctx.assertion);
      return String();
    }
  }
  return v;
}

_bigint.type = () => "string.bigint";
_bigint.value = () => "";

_string.bigint = (_bigint: StringValidator);

function _uri (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, _convert?: boolean = false): string {
  const v = _string(value, _scope, err, _ctx, _convert);
  if (_ctx.assertion !== false) {
    try {
      decodeURI(v);
    } catch (_) {
      _ctx.assertion = false;
      assertContext(_uri.name, getType(_uri), v, _scope, err, _ctx.assertion);
      return String();
    }
  }
  return v;
}

_uri.type = () => "string.uri";
_uri.value = () => "";

_string.uri = (_uri: StringValidator);

function _base64 (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, _convert?: boolean = false): string {
  const v = _string(value, _scope, err, _ctx, _convert);
  if (_ctx.assertion !== false) {
    try {
        atob(v);
    } catch (_) {
      _ctx.assertion = false;
      assertContext(_base64.name, getType(_base64), v, _scope, err, _ctx.assertion);
      return String();
    }
  }
  return v;
}

_base64.type = () => "string.base64";
_base64.value = () => "";

_string.base64 = (_base64: StringValidator);
