// @flow

import { assertContext, convertValue } from "../type.js";
import { getType } from "../utils.js";
import { string } from "./primitives.js";

import type { AssertionContext, TypeAssertError, MixedValidator } from "..";

function _mixed (value: mixed) {
  return value;
}
_mixed.type = () => "mixed";
_mixed.value = () => "";

export const mixed = (_mixed: MixedValidator);

function _json (value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, _convert?: boolean = false): mixed {
  const v = string(value, _scope, err, _ctx, _convert);
  if (_ctx.assertion !== false) {
    try {
        return JSON.parse(v);
    } catch (_) {
      _ctx.assertion = false;
      assertContext(_json.name, getType(_json), v, _scope, err, _ctx.assertion);
    }
  }
  return v;
}

_json.type = () => "string.json";
_json.value = () => "";

_mixed.json = (_json: MixedValidator);

