// @flow
import { assertContext } from "../type.js";
import { getType } from "../utils.js";
import { validatorError, validatorTypeError } from "../error.js";
import { deprwarn, string, number } from "../index.js";

import type { TypeValidator, TypeAssertError, AssertionContext } from "..";

export const unionOf: Union2TypeValidator = function unionOf_ (va, vb) {
  deprwarn("calling unionOf is deprecated; fallback to unionOf2; use validators with arity, ex. unionOf2, ... unionOf6", "FT003")
  return union2(va, vb);
};

function assertUnion <T> (vx: TypeValidator<T>, value: mixed, _scope: string, err: ?TypeAssertError[], convert: boolean): T {
 const ctx = { assertion: true };
 const v = vx(value, _scope, err, ctx, convert);
 if (ctx.assertion === false) {
   throw {};
 }
 return v;
}

type Union2TypeValidator = <A, B> (TypeValidator<A>, TypeValidator<B>, label?: string, convert?: boolean) => TypeValidator<A | B>;

export const union2: Union2TypeValidator = function (va, vb, label = "", convert = false) {
  const type = () => `(${getType(va)} | ${getType(vb)})`;
  const union_value = () => va.value() ?? vb.value();
  function union (value: mixed, _scope: string = label, err: ?TypeAssertError[], _ctx: AssertionContext = {}, _convert: boolean = convert) {
    try {
      return assertUnion(va, value, _scope, err, _convert);
    } catch (_) {
      try {
        return assertUnion(vb, value, _scope, err, _convert);
      } catch (_) {
        _ctx.assertion = false;
        assertContext("union", type(), value, _scope, err, _ctx);
        return union_value();
      }
    }
  }
  union.type = type;
  union.value = union_value;
  return union;
};

type Union3TypeValidator = <A, B, C> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>, label?: string, convert?: boolean) => TypeValidator<A | B | C>;

export const union3: Union3TypeValidator = function (va, vb, vc, label = "", convert = false) {
  const type = () => `${getType(va)} | ${getType(vb)} | ${getType(vc)}`;
  const union_value = () => va.value() ?? vb.value() ?? vc.value();
  function union (value: mixed, _scope: string = label, err: ?TypeAssertError[], _ctx: AssertionContext = {}, _convert: boolean = convert) {
    try {
      return assertUnion(va, value, _scope, err, _convert);
    } catch (_) {
      try {
        return assertUnion(vb, value, _scope, err, _convert);
      } catch (_) {
        try {
          return assertUnion(vc, value, _scope, err, _convert);
        } catch (_) {
          _ctx.assertion = false;
          assertContext("union", type(), value, _scope, err, _ctx);
          return union_value();
        }
      }
    }
  }
  union.type = type;
  union.value = union_value;
  return union;
};

type Union4TypeValidator = <A, B, C, D> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>, TypeValidator<D>, label?: string, convert?: boolean) => TypeValidator<A | B | C | D>;

export const union4: Union4TypeValidator = function (va, vb, vc, vd, label = "", convert = false) {
  const type = () => `${getType(va)} | ${getType(vb)} | ${getType(vc)} | ${getType(vd)}`;
  const union_value = () => va.value() ?? vb.value() ?? vc.value() ?? vd.value();
  function union (value: mixed, _scope: string = label, err: ?TypeAssertError[], _ctx: AssertionContext = {}, _convert: boolean = convert) {
    try {
      return assertUnion(va, value, _scope, err, _convert);
    } catch (_) {
      try {
        return assertUnion(vb, value, _scope, err, _convert);
      } catch (_) {
        try {
          return assertUnion(vc, value, _scope, err, _convert);
        } catch (_) {
          try {
            return assertUnion(vd, value, _scope, err, _convert);
          } catch (_) {
            _ctx.assertion = false;
            assertContext("union", type(), value, _scope, err, _ctx);
            return union_value();
          }
        }
      }
    }
  }
  union.type = type;
  union.value = union_value ;
  return union;
};

type Union5TypeValidator = <A, B, C, D, E> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>, TypeValidator<D>, TypeValidator<E>, label?: string, convert?: boolean) => TypeValidator<A | B | C | D | E>;

export const union5: Union5TypeValidator = function (va, vb, vc, vd, ve, label = "", convert = false) {
  const type = () => `${getType(va)} | ${getType(vb)} | ${getType(vc)} | ${getType(vd)} | ${getType(ve)}`;
  const union_value = () => va.value() ?? vb.value() ?? vc.value() ?? vd.value() ?? ve.value();
  function union (value: mixed, _scope: string = label, err: ?TypeAssertError[], _ctx: AssertionContext = {}, _convert: boolean = convert) {
    try {
      return assertUnion(va, value, _scope, err, _convert);
    } catch (_) {
      try {
        return assertUnion(vb, value, _scope, err, _convert);
      } catch (_) {
        try {
          return assertUnion(vc, value, _scope, err, _convert);
        } catch (_) {
          try {
            return assertUnion(vd, value, _scope, err, _convert);
          } catch (_) {
            try {
              return assertUnion(ve, value, _scope, err, _convert);
            } catch (_) {
              _ctx.assertion = false;
              assertContext("union", type(), value, _scope, err, _ctx);
              return union_value();
            }
          }
        }
      }
    }
  }
  union.type = type;
  union.value = union_value ;
  return union;
};

type Union6TypeValidator = <A, B, C, D, E, F> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>, TypeValidator<D>, TypeValidator<E>, TypeValidator<F>, label?: string, convert?: boolean) => TypeValidator<A | B | C | D | E | F>;

export const union6: Union6TypeValidator = function (va, vb, vc, vd, ve, vf, label = "", convert = false) {
  const type = () => `(${getType(va)} | ${getType(vb)}) | ${getType(vc)} | ${getType(vd)} | ${getType(ve)} | ${getType(vf)}`;
  const union_value = () => va.value() ?? vb.value() ?? vc.value() ?? vd.value() ?? ve.value() ?? vf.value();
  function union (value: mixed, _scope: string = label, err: ?TypeAssertError[], _ctx: AssertionContext = {}, _convert: boolean = convert) {
    try {
      return assertUnion(va, value, _scope, err, _convert);
    } catch (_) {
      try {
        return assertUnion(vb, value, _scope, err, _convert);
      } catch (_) {
        try {
          return assertUnion(vc ,value, _scope, err, _convert);
        } catch (_) {
          try {
            return assertUnion(vd, value, _scope, err, _convert);
          } catch (_) {
            try {
              return assertUnion(ve ,value, _scope, err, _convert);
            } catch (_) {
              try {
                return assertUnion(vf, value, _scope, err, _convert);
              } catch (_) {
                _ctx.assertion = false;
                assertContext("union", type(), value, _scope, err, _ctx);
                return union_value();
              }
            }
          }
        }
      }
    }
  }
  union.type = type;
  union.value = union_value;
  return union;
};

