// @flow
import { getType } from '../utils.js'
import { validatorError } from '../error.js'
import { assertContext } from '../type.js'

import type { TypeValidator, TypeArrayValidator, TypeAssertError, AssertionContext } from '..'

const toArray = (
  function <T>(typeFn: TypeValidator<T>, value: mixed, _scope: string, ctx: AssertionContext): Array<T> {
    if (Array.isArray(value)) {
      return value.map((v, i) => typeFn(v, `${_scope}[${i}]`))
    }
    ctx.assertion = false
    return Array()
  }
)

export const arrayOf =
  <T>(typeFn: TypeValidator<T>, label?: string = 'Array'): TypeArrayValidator<T> => {
    function array (value: mixed, _scope: string = label, err: ?TypeAssertError[], _ctx: AssertionContext = {}): Array<T> {
      const v = toArray(typeFn, value, _scope, _ctx)
      assertContext(array.name, array.type(), value, _scope, err, _ctx);
      return v
    }
    array.type = () => `Array<${getType(typeFn)}>`
    array.value = () => [typeFn.value()]
    return array
  }
