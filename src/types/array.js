// @flow
const { getType } = require('../utils')
const { validatorError } = require('../error')
const { isEmpty } = require('../is')

import type { TypeValidator, TypeArrayValidator } from '..'

exports.arrayOf =
  <T>(typeFn: TypeValidator<T>, label?: string = 'Array'): TypeArrayValidator<T> => {
    function array (v, _scope = label) {
      if (isEmpty(v)) return [typeFn(v)]
      if (Array.isArray(v)) {
        let index = 0
        return v.map(v => typeFn(v, `${_scope}[${index++}]`))
      }
      throw validatorError(array, v, _scope)
    }
    array.type = () => `Array<${getType(typeFn)}>`
    return array
  }
