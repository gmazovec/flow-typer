// @flow
import { convertValue, assertContext } from "../type.js";
import { getType } from "../utils.js";
import {
  isBoolean,
  isNumber,
  isString,
} from "../is.js";

import type { BooleanValidator, TypeAssertError, AssertionContext } from "..";

function toBoolean (value: mixed, ctx: AssertionContext, convert: boolean): boolean {
  if (isBoolean(value)) {
    return value;
  }
  if (convert) {
    if (value === "true" || value === "false") {
      return value === "true";
    }
  }
  ctx.assertion = false;
  return Boolean();
}

function _boolean (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, convert: boolean = false): boolean {
  const v = convertValue(toBoolean, value, _ctx, convert);
  assertContext(boolean.name, getType(boolean), value, _scope, err, _ctx.assertion);
  return v;
}
_boolean.type = () => "boolean";
_boolean.value = () => false;

export const boolean = (_boolean: BooleanValidator);

const _toboolean = function boolean (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, convert: boolean = false): boolean {
  const v = convertValue(toBoolean, value, _ctx, true);
  assertContext(boolean.name, getType(boolean), value, _scope, err, _ctx.assertion);
  return v;
}
_toboolean.type = () => "boolean";
_toboolean.value = () => false;

export const toboolean = (_toboolean: BooleanValidator);
