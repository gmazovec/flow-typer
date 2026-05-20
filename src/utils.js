// @flow

import { validatorTypeError } from "./error.js";

import type { TypeAssertError, LiteralValue, TypeValidator, TypeChecker, TypeCallbackValidator, AssertionContext } from "./";

export const isType =
  <T, F: TypeValidator<T>>(typeFn: F): TypeChecker<boolean> =>
    (v: mixed, _scope? = ""): boolean => {
      try {
        typeFn(v, _scope);
        return true;
      } catch (_) {
        return false;
      }
    };

// This function will return value based on schema with inferred types. This
// value can be used to define type in Flow with "typeof" utility.

export const typeOf =
  <T>(schema: TypeValidator<T>): T =>
    schema.value();

export const getType = (
  function getType (typeFn, _options) {
    return typeFn.type(_options);
  }
  : <T>(TypeValidator<T>, ?{ noVoid: boolean }) => string
);

export const type =
  <V, T: (mixed) => V> (typeFn: T, name: string = ""): TypeCallbackValidator<T> => {
    function type (value: mixed, _scope: string = "") {
        try {
          return typeFn(value);
        } catch (err) {
          throw validatorTypeError(typeFn.name, typeFn.name, value, _scope);
        }
    }
    type.type = () => name;
    return type;
  };

export function debugType <T> (typeFn: TypeValidator<T>, value: mixed): [TypeAssertError[], T] {
  const err: TypeAssertError[] = [];
  return [err, typeFn(value, "userType", err)];
}

export function to <T> (typeFn: TypeValidator<T>): (mixed) => T {
  return function totype(value: mixed, _scope: string = "", err: ?TypeAssertError[], _ctx?: AssertionContext = {}, convert: boolean = true): T {
    return typeFn(value, _scope, err, _ctx, true);
  };
}

