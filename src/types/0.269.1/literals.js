// @flow
import { assertContext } from "../../type.js";
import { isUndef } from "../../is.js";
import { versions } from "../../versions.js";

import type { TypeValidator, TypeAssertError, AssertionContext } from "../..";

export const literal =
  <const T> (primitive: T, label?: string = "", convert?: boolean = false): TypeValidator<T> => {
    if (versions.flow && versions.flow < "0.269.1") {
      console.error("literal() type checking is not supported; upgrade flow to version >= 0.269.1");
    }

    function literal (value: mixed, _scope: string = label, err: ?TypeAssertError[], _ctx: AssertionContext = {}, _convert: boolean = convert): T {
      _ctx.assertion = value === primitive;
      assertContext(literal.name, literal.type(), value, _scope, err, _ctx.assertion);
      return primitive;
    }
    literal.type = () => {
      if (isUndef(primitive)) {
        return "void";
      }
      return JSON.stringify(primitive) || "";
    }
    literal.value = (): T => primitive;
    return literal;
};
