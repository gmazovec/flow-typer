// @flow
import { assertContext } from "../type.js";
import { getType } from "../utils.js";
import { validatorError } from "../error.js";
import { boolean, number, string, undef } from "./primitives.js";
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
    deprwarn("mapOf() keyTypeFn parameter id deprecated; use entries to build the map of object type keys.");
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

function createMapValidator <T> (typeFn: TypeValidator<T>, label?: string = "Map", convert?: boolean = false): TypeValidator<{ [string]: T }> {
  return mapOf(string, typeFn, label, convert);
}

mapOf.boolean = (createMapValidator(boolean): TypeMapValidator<boolean>);

mapOf.number = (createMapValidator(number): TypeMapValidator<number>);

mapOf.string = function mapOfString (value: mixed, _scope: string, err?: TypeAssertError[], _ctx: AssertionContext = {}, _convert: boolean = false): { [string]: string } {
  return mapOf(string, string)(value, _scope, err, _ctx, _convert);
};

