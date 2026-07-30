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
