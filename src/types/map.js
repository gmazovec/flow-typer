// @flow
import { assertContext } from "../type.js";
import { getType } from "../utils.js";
import { validatorError } from "../error.js";
import { boolean, number, string } from "./primitives.js";
import { object } from "./object.js";
import { unionOf } from "./union.js";
import { deprwarn } from "../error.js";

import type { TypeValidator, TypeMapValidator, TypeAssertError, AssertionContext } from "..";

export const mapOf = <K, V>
  (
    keyTypeFn: TypeValidator<K>,
    typeFn: TypeValidator<V>,
    label?: string = "Map",
    convert?: boolean = false
  ): TypeValidator<{ [K]: V }> => {
    deprwarn("mapOf() return type has changed to an array of [key, value] tuple.", "FT007");
    const type = () => `{ [_:${getType(keyTypeFn)}]: ${getType(typeFn)} }`;
    function mapOf (value: mixed, _scope: string = label, err: ?TypeAssertError[], _ctx: AssertionContext = {}, _convert: boolean = convert) {
      const o = object(value, _scope, err, _ctx, _convert);
      assertContext("mapOf", type(), value, _scope, err, _ctx.assertion);
      const reducer = (acc: $Exact<{...}>, key: string) =>
        Object.assign(
          acc,
          {
            // $FlowFixMe[invalid-computed-prop]
            [keyTypeFn(key, `${_scope}[_]`, err, _ctx, _convert)]
              :typeFn(o[key], `${_scope}.${key}`, err, _ctx, _convert)
          }
        );
      return Object.keys(o).reduce(reducer, {});
    }
    mapOf.type = type; 
    mapOf.value = (): { [K]: V } => ({});
    return mapOf;
  };

function createMapOfValidator <T> (typeFn: TypeValidator<T>, label?: string = "Map", convert?: boolean = false): TypeValidator<{ [string]: T }> {
  return mapOf(string, typeFn, label, convert);
}

mapOf.boolean = (createMapOfValidator(boolean): TypeMapValidator<boolean>);

mapOf.number = (createMapOfValidator(number): TypeMapValidator<number>);

mapOf.string = (createMapOfValidator(string): TypeMapValidator<string>);

export const map = <V>
  (
    typeFn: TypeValidator<V>,
    label?: string = "Object",
    convert?: boolean = false
  ): TypeMapValidator<V> => {
    const type = () => `{ [string]: ${getType(typeFn)} }`;
    function map (value: mixed, _scope: string = label, err: ?TypeAssertError[], _ctx: AssertionContext = {}, _convert: boolean = convert) {
      const o = object(value, _scope, err, _ctx, _convert);
      assertContext("map", type(), value, _scope, err, _ctx.assertion);
      const reducer = (acc: { [string]: V }, key: string) =>
        Object.assign(
          acc,
          {
            [key]: typeFn(o[key], `${_scope}.${key}`, err, _ctx, _convert)
          }
        );
      return Object.keys(o).reduce(reducer, {});
    }
    map.type = type;
    map.value = (): { [string]: V } => ({});
    return map;
  };

function createMapValidator <T> (typeFn: TypeValidator<T>, label?: string = "Object", convert?: boolean = false): TypeValidator<{ [string]: T }> {
  return map(typeFn, label, convert);
}

map.boolean = (createMapValidator(boolean): TypeMapValidator<boolean>);

map.number = (createMapValidator(number): TypeMapValidator<number>);

map.string = (createMapValidator(string): TypeMapValidator<string>);

