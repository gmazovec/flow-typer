// @flow
import { validatorTypeError } from './error.js'
import { isObject } from './is.js'

import type { TypeAssertError, AssertionContext } from '.'

export function convertValue <T> (typeFn: (mixed, AssertionContext, boolean) => T, value: mixed, ctx: AssertionContext, convert: boolean): T {
  const v = typeFn(value, ctx, convert);
  if (ctx.assertion === false) {
    ctx.assertion = true;
    if (Array.isArray(value) && value.length === 1) {
      return typeFn(value[0], ctx, convert);
    }
    if (isObject(value)) {
      const keys = Object.keys(value);
      if (keys.length === 1) {
        return typeFn(value[keys[0]], ctx, convert);
      }
    }
    ctx.assertion = false;
  }
  return v;
}

export function assertContext (name: string, type: string, value: mixed, scope: string, err: ?TypeAssertError[], ctx: AssertionContext, msg?: string = ""): void {
  if (ctx.assertion === false) {
    if (err) {
      err.push({ expected: type, actual: typeof value, scope: scope })
    } else {
      throw validatorTypeError(name, type, value, scope, msg)
    }
  }
}
