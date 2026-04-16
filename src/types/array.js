// @flow
import { getType } from "../utils.js";
import { validatorError } from "../error.js";
import { assertContext } from "../type.js";
import { isObject } from "../is.js";

import type { TypeValidator, TypeArrayValidator, TypeAssertError, AssertionContext } from "..";

const toArray = (
  function <T>(typeFn: TypeValidator<T>, value: mixed, _scope: string, err: ?TypeAssertError[], ctx: AssertionContext, convert: boolean): Array<T> {
    if (Array.isArray(value)) {
      return value.map((v, i) => typeFn(v, `${_scope}[${i}]`, err, ctx, convert));
    }
    if (convert) {
      if (isObject(value)) {
        return Object.values(value).map((v, i) => typeFn(v, `${_scope}[${i}]`, err, ctx, convert));
      }
    }
    ctx.assertion = false;
    return Array();
  }
);

export const arrayOf =
  <T>(typeFn: TypeValidator<T>, label?: string = "Array", convert?: boolean = false): TypeArrayValidator<T> => {
    function array (value: mixed, _scope: string = label, err: ?TypeAssertError[], _ctx: AssertionContext = {}, _convert: boolean = convert): Array<T> {
      const v = toArray(typeFn, value, _scope, err, _ctx, _convert);
      assertContext(array.name, array.type(), value, _scope, err, _ctx.assertion);
      return v;
    }
    array.type = () => `Array<${getType(typeFn)}>`;
    array.value = () => [typeFn.value()];
    return array;
  };
