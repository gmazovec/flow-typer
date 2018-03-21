// @flow
const { validatorError, getType } = require('../utils')
const { isEmpty } = require('../is')

import type { TypeValidator, TypeArrayValidator } from '..'

exports.arrayOf =
  <T>(typeFn: TypeValidator<T>): TypeArrayValidator<T> => {
    function array (v) {
      if (isEmpty(v)) return [typeFn(v)]
      if (Array.isArray(v)) return v.map(typeFn)
      throw validatorError(array, v)
    }
    array.type = () => `${getType(typeFn)}[]`
    return array
  }
