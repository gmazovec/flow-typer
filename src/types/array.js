// @flow
import { getType } from '../utils.js'
import { validatorError } from '../error.js'

import type { TypeValidator, TypeArrayValidator } from '..'

export const arrayOf =
  <T>(typeFn: TypeValidator<T>, label?: string = 'Array'): TypeArrayValidator<T> => {
    function array (value: mixed, _scope: string = label): T[] {
      if (Array.isArray(value)) {
        return value.map((v, i) => typeFn(v, `${_scope}[${i}]`))
      }
      throw validatorError(array, value, _scope)
    }
    array.type = () => `Array<${getType(typeFn)}>`
    array.value = () => [typeFn.value()]
    return array
  }
