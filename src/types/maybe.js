// @flow
const { isNil, isUndef } = require('../is')
const { getType } = require('../utils')

import type { TypeValidator, TypeMaybeValidator } from '..'

exports.maybe =
  <T>(typeFn: TypeValidator<T>): TypeMaybeValidator<T> => {
    function maybe (value, _scope = '') {
      return (isNil(value) || isUndef(value)) ? value : typeFn(value, _scope)
    }
    maybe.type = () => `?(${getType(typeFn)})`
    return maybe
  }
