// @flow
import { deprwarn } from "../error.js";
import { convertValue, assertContext } from "../type.js";
import { getType } from "../utils.js";
import {
  isNull,
  isUndef,
  isBoolean,
  isNumber,
  isString,
} from "../is.js";
import { boolean as _boolean } from "./boolean.js";
import { number as _number } from "./number.js";
import { string as _string } from "./string.js";

import type { NullValidator, VoidValidator, BooleanValidator, NumberValidator, StringValidator, TypeAssertError, AssertionContext } from "..";

function toNil (value: mixed, ctx: AssertionContext, convert: boolean): null {
  if (isNull(value)) {
    return null;
  }
  if (convert) {
    if (value === "null") {
      return null;
    }
  }
  ctx.assertion = false;
  return null;
}

function _nil (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, convert: boolean = false): null {
  deprwarn("nil() validator is deprecated; use maybe() or optional() instead.", "FT005");
  const v = convertValue(toNil, value, _ctx, convert);
  assertContext(nil.name, getType(nil), value, _scope, err, _ctx.assertion);
  return v;
}
_nil.type = () => "null";
_nil.value = () => null;

export const nil = (_nil: NullValidator);

const _tonil = function _nil (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, convert: boolean = true): null {
  deprwarn("tonil() validator is deprecated; use maybe() or optional() instead.", "FT005");
  const v = convertValue(toNil, value, _ctx, true);
  assertContext(nil.name, getType(nil), value, _scope, err, _ctx.assertion);
  return v;
}
_tonil.type = () => "null";
_tonil.value = () => null;

export const tonil = (_tonil: NullValidator);

function toUndef (value: mixed, ctx: AssertionContext, convert: boolean): void {
  if (convert) {
    if (value === "undefined") {
      return undefined;
    }
  }
  if (!isUndef(value)) {
    ctx.assertion = false;
  }
}

function _undef (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, convert: boolean = false): void {
  deprwarn("undef() validator is deprecated; use maybe() or optional() instead.", "FT005");
  convertValue(toUndef, value, _ctx, convert);
  assertContext(undef.name, getType(undef), value, _scope, err, _ctx.assertion);
}
_undef.type = () => "void";
_undef.value = () => undefined;

export const undef = (_undef: VoidValidator);

const _toundefined = function _undefined (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, convert: boolean = true): void {
  deprwarn("toundefined() validator is deprecated; use maybe() or optional() instead.", "FT005");
  convertValue(toUndef, value, _ctx, true);
  assertContext(undef.name, getType(undef), value, _scope, err, _ctx.assertion);
}
_toundefined.type = () => "void";
_toundefined.value = () => undefined;

export const toundefined = (_toundefined: VoidValidator);
export const boolean = _boolean;
export const number = _number;
export const string = _string;
