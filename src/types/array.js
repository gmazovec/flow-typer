// @flow
const { error } = require('../utils')
const { isEmpty } = require('../is')

import type { TypeValidator, TypeArrayValidator } from '..'

exports.arrayOf =
  <T>(typeFn: TypeValidator<T>): TypeArrayValidator<T> =>
    (v: mixed): T[] => {
      if (isEmpty(v)) return [typeFn(v)]
      if (Array.isArray(v)) return v.map(typeFn)
      throw error('array type', typeof v)
    }
