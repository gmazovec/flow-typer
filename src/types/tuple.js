// @flow
import { assertContext } from "../type.js";
import { getType } from "../utils.js";
import { deprwarn, validatorError, validatorTypeError } from "../error.js";

import type { TypeValidator, TypeAssertError, AssertionContext } from "../";

export const tupleOf: Tuple2TypeValidator = function tupleOf_ (va, vb) {
  deprwarn("calling tupleOf is deprecated; fallback to tupleOf2; use validators with arity, ex. tupleOf2, ... tupleOf6", "FT002");
  return tuple2(va, vb);
};

type Tuple1TypeValidator = <A> (TypeValidator<A>, label?: string, convert?: boolean) => TypeValidator<[A]>

export const tuple1: Tuple1TypeValidator = function (va, label = "", convert = false) {
  const tuple_type = () => `[${getType(va)}]`;
  const tuple_value = () => [va.value()];
  function tuple (value: mixed, _scope: string = label, err: ?TypeAssertError[], _ctx: AssertionContext = {}, _convert: boolean = convert) {
    if (Array.isArray(value) && value.length === 1) {
      return [va(value[0], _scope, err, _ctx, _convert)];
    }
    _ctx.assertion = false;
    assertContext("tuple", tuple_type(), value, _scope, err, _ctx);
    return tuple_value();
  }
  tuple.type = tuple_type;
  tuple.value = tuple_value;
  return tuple;
};

type Tuple2TypeValidator = <A, B> (TypeValidator<A>, TypeValidator<B>, label?: string, convert?: boolean) => TypeValidator<[A, B]>;

export const tuple2: Tuple2TypeValidator = function (va, vb, label = "", convert = false) {
  const tuple_type = () => `[${getType(va)}, ${getType(vb)}]`;
  const tuple_value = () => [va.value(), vb.value()];
  function tuple (value: mixed, _scope: string = label, err: ?TypeAssertError[], _ctx: AssertionContext = {}, _convert: boolean = convert) {
    if (Array.isArray(value) && value.length === 2) {
      return [va(value[0], _scope, err, _ctx, _convert), vb(value[1], _scope, err, _ctx, _convert)];
    }
    _ctx.assertion = false;
    assertContext("tuple", tuple_type(), value, _scope, err, _ctx);
    return tuple_value();
  }
  tuple.type = tuple_type;
  tuple.value = tuple_value;
  return tuple;
};

type Tuple3TypeValidator = <A, B, C> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>, label?: string, convert?: boolean) => TypeValidator<[A, B, C]>;

export const tuple3: Tuple3TypeValidator = function (va, vb, vc, label = "", convert = false) {
  const tuple_type = () => `[${getType(va)}, ${getType(vb)}, ${getType(vc)}]`;
  const tuple_value = () => [va.value(), vb.value(), vc.value()];
  function tuple (value: mixed, _scope: string = label, err: ?TypeAssertError[], _ctx: AssertionContext = {}, _convert: boolean = convert) {
    if (Array.isArray(value) && value.length === 3) {
      return [va(value[0], _scope, err, _ctx, _convert), vb(value[1], _scope, err, _ctx, _convert), vc(value[2], _scope, err, _ctx, _convert)];
    }
    _ctx.assertion = false;
    assertContext("tuple", tuple_type(), value, _scope, err, _ctx);
    return tuple_value();
  }
  tuple.type = tuple_type;
  tuple.value = tuple_value;
  return tuple;
};

type Tuple4TypeValidator = <A, B, C, D> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>, TypeValidator<D>, label?: string, convert?: boolean) => TypeValidator<[A, B, C, D]>;

export const tuple4: Tuple4TypeValidator = function (va, vb, vc, vd, label = "", convert = false) {
  const tuple_type = () => `[${getType(va)}, ${getType(vb)}, ${getType(vc)}, ${getType(vd)}]`;
  const tuple_value = () => [va.value(), vb.value(), vc.value(), vd.value()];
  function tuple (value: mixed, _scope: string = label, err: ?TypeAssertError[], _ctx: AssertionContext = {}, _convert: boolean = convert) {
    if (Array.isArray(value) && value.length === 4) {
      return [
        va(value[0], _scope, err, _ctx, _convert), vb(value[1], _scope, err, _ctx, _convert),
        vc(value[2], _scope, err, _ctx, _convert), vd(value[3], _scope, err, _ctx, _convert)
      ];
    }
    _ctx.assertion = false;
    assertContext("tuple", tuple_type(), value, _scope, err, _ctx);
    return tuple_value();
  }
  tuple.type = tuple_type;
  tuple.value = tuple_value;
  return tuple;
};

type Tuple5TypeValidator = <A, B, C, D, E> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>, TypeValidator<D>, TypeValidator<E>, label?: string, convert?: boolean) => TypeValidator<[A, B, C, D, E]>;

export const tuple5: Tuple5TypeValidator = function (va, vb, vc, vd, ve, label = "", convert = false) {
  const tuple_type = () => `[${getType(va)}, ${getType(vb)}, ${getType(vc)}, ${getType(vd)}, ${getType(ve)}]`;
  const tuple_value = () => [va.value(), vb.value(), vc.value(), vd.value(), ve.value()];
  function tuple (value: mixed, _scope: string = label, err: ?TypeAssertError[], _ctx: AssertionContext = {}, _convert: boolean = convert) {
    if (Array.isArray(value) && value.length === 5) {
      return [
        va(value[0], _scope, err, _ctx, _convert), vb(value[1], _scope, err, _ctx, _convert),
        vc(value[2], _scope, err, _ctx, _convert), vd(value[3], _scope, err, _ctx, _convert),
        ve(value[4], _scope, err, _ctx, _convert)
      ];
    }
    _ctx.assertion = false;
    assertContext("tuple", tuple_type(), value, _scope, err, _ctx);
    return tuple_value();
  }
  tuple.type = tuple_type;
  tuple.value = tuple_value;
  return tuple;
};

type Tuple6TypeValidator = <A, B, C, D, E, F> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>, TypeValidator<D>, TypeValidator<E>, TypeValidator<F>, label?: string, convert?: boolean) => TypeValidator<[A, B, C, D, E, F]>;

export const tuple6: Tuple6TypeValidator = function (va, vb, vc, vd, ve, vf, label = "", convert = false) {
  const tuple_type = () => `[${getType(va)}, ${getType(vb)}, ${getType(vc)}, ${getType(vd)}, ${getType(ve)}, ${getType(vf)}]`;
  const tuple_value = () => [va.value(), vb.value(), vc.value(), vd.value(), ve.value(), vf.value()];
  function tuple (value: mixed, _scope: string = label, err: ?TypeAssertError[], _ctx: AssertionContext = {}, _convert: boolean = convert) {
    if (Array.isArray(value) && value.length === 6) {
      return [
        va(value[0], _scope, err, _ctx, _convert), vb(value[1], _scope, err, _ctx, _convert),
        vc(value[2], _scope, err, _ctx, _convert), vd(value[3], _scope, err, _ctx, _convert),
        ve(value[4], _scope, err, _ctx, _convert), vf(value[5], _scope, err, _ctx, _convert)
      ];
    }
    _ctx.assertion = false;
    assertContext("tuple", tuple_type(), value, _scope, err, _ctx);
    return tuple_value();
  }
  tuple.type = tuple_type;
  tuple.value = tuple_value;
  return tuple;
};

