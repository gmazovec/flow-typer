// @flow
const { isNil, isUndef } = require('../is')

import type { TypeValidator, TypeMaybeValidator } from '..'

exports.maybe =
  <T>(typeFn: TypeValidator<T>): TypeMaybeValidator<T> =>
    (v: mixed): ?T =>
      (isNil(v) || isUndef(v)) ? v : typeFn(v)
