// @flow
const { isNil, isUndef } = require('../is')
const { getType } = require('../utils')

import type { TypeValidator, TypeMaybeValidator } from '..'

const isPrimitiveFn = (typeName: string) =>
  ['undefined', 'null', 'boolean', 'number', 'string'].includes(typeName)

exports.maybe =
  <T>(typeFn: TypeValidator<T>): TypeMaybeValidator<T> => {
    function maybe (value: mixed, _scope: string = '') {
      return (isNil(value) || isUndef(value)) ? value : typeFn(value, _scope)
    }
    maybe.type = () => !isPrimitiveFn(typeFn.name) ? `?(${getType(typeFn)})` : `?${getType(typeFn)}`
    return maybe
  }
