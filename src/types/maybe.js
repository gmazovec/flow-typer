// @flow
import { isNil, isUndef } from '../is.js'
import { getType } from '../utils.js'

import type { TypeValidator, TypeMaybeValidator } from '..'

const isPrimitiveFn = (typeName: string) =>
  ['undefined', 'null', 'boolean', 'number', 'string'].includes(typeName)

export const maybe =
  <T>(typeFn: TypeValidator<T>): TypeMaybeValidator<T> => {
    function maybe (value: mixed, _scope: string = '') {
      return (isNil(value) || isUndef(value)) ? value : typeFn(value, _scope)
    }
    maybe.type = () => !isPrimitiveFn(typeFn.name) ? `?(${getType(typeFn)})` : `?${getType(typeFn)}`
    maybe.value = () => typeFn.value();
    return maybe
  }
