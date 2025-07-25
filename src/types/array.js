// @flow
const { getType } = require('../utils')
const { validatorError } = require('../error')
const { isEmpty } = require('../is')

import type { TypeValidator, TypeArrayValidator } from '..'

exports.arrayOf =
  <T>(typeFn: TypeValidator<T>, label?: string = 'Array'): TypeArrayValidator<T> => {
    function array (value: mixed, _scope: string = label): T[] {
      if (isEmpty(value)) return [typeFn(value)]
      if (Array.isArray(value)) {
        let index = 0
        return value.map(v => typeFn(v, `${_scope}[${index++}]`))
      }
      throw validatorError(array, value, _scope)
    }
    array.type = () => `Array<${getType(typeFn)}>`
    return array
  }
