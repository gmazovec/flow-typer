// @flow
import { getType } from '../utils.js'
import { validatorError } from '../error.js'
import { EMPTY_VALUE } from '../const.js'

import type { TypeValidator, TypeArrayValidator } from '..'

export const arrayOf =
  <T>(typeFn: TypeValidator<T>, label?: string = 'Array'): TypeArrayValidator<T> => {
    function array (value: mixed, _scope: string = label): T[] {
      if (value === EMPTY_VALUE) return [typeFn(value)]
      if (Array.isArray(value)) {
        let index = 0
        return value.map(v => typeFn(v, `${_scope}[${index++}]`))
      }
      throw validatorError(array, value, _scope)
    }
    array.type = () => `Array<${getType(typeFn)}>`
    return array
  }
