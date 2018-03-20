// @flow
const { isNil, isUndef } = require('../is')

import type { TypeValidator, TypeMaybeValidator } from '..'

exports.maybe =
  <T>(typeFn: TypeValidator<T>): TypeMaybeValidator<T> =>
    function maybe (v) {
      return (isNil(v) || isUndef(v)) ? v : typeFn(v)
    }
