// @flow
import { getType } from '../utils.js'
import { validatorError } from '../error.js'

import type { TypeValidator, TypeArrayValidator, TypeAssertError } from '..'

const toArray = (
  function <T>(typeFn: TypeValidator<T>, value: mixed, _scope: string): Array<T> | void {
    if (Array.isArray(value)) {
      return value.map((v, i) => typeFn(v, `${_scope}[${i}]`))
    }
  }
)

export const arrayOf =
  <T>(typeFn: TypeValidator<T>, label?: string = 'Array'): TypeArrayValidator<T> => {
    function array (value: mixed, _scope: string = label, err: ?TypeAssertError[]): Array<T> {
      const v = toArray(typeFn, value, _scope)
      if (v !== undefined) {
        return v;
      }
      if (err) {
        err.push({ expected: array.type(), actual: typeof(value), scope: _scope })
      }
      throw validatorError(array, value, _scope)
    }
    array.type = () => `Array<${getType(typeFn)}>`
    array.value = () => [typeFn.value()]
    return array
  }
