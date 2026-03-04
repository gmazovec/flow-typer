// @flow
import { isNull, isUndef } from '../is.js'
import { getType } from '../utils.js'

import type { TypeValidator, TypeMaybeValidator, TypeAssertError, AssertionContext } from '..'

const isPrimitiveFn = (typeName: string) =>
  ['undefined', 'null', 'boolean', 'number', 'string'].includes(typeName)

export const maybe =
  <T>(typeFn: TypeValidator<T>): TypeMaybeValidator<T> => {
    function maybe (value: mixed, _scope: string = '', err: ?TypeAssertError[], _ctx: AssertionContext = {}, convert: boolean = false) {
      return (isNull(value) || isUndef(value)) ? value : typeFn(value, _scope, err, _ctx, convert)
    }
    maybe.type = () => !isPrimitiveFn(typeFn.name) ? `?(${getType(typeFn)})` : `?${getType(typeFn)}`
    maybe.value = () => typeFn.value();
    return maybe
  }
