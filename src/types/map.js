// @flow
import { getType } from "../utils.js";
import { validatorError } from "../error.js";
import { undef } from "./primitives.js";
import { object } from "./object.js";
import { unionOf } from "./union.js";

import type { TypeValidator, TypeAssertError, AssertionContext } from "..";

export const mapOf = <K, V>
  (
    keyTypeFn: TypeValidator<K>,
    typeFn: TypeValidator<V>,
    label?: string = "Map",
    convert?: boolean = false
  ): TypeValidator<{ [K]: V }> => {
    function mapOf (value: mixed, _scope: string = label, err: ?TypeAssertError[], _ctx: AssertionContext = {}, _convert: boolean = convert) {
      const o = object(value, _scope, err, _ctx, _convert);
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
    mapOf.type = () => `{ [_:${getType(keyTypeFn)}]: ${getType(typeFn)} }`;
    mapOf.value = (): { [K]: V } => ({});
    return mapOf;
  };
