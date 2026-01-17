// @flow
import { validatorError } from '../error.js'
import { isBoolean, isNull, isUndef, isObject, isString } from '../is.js'
import { deprwarn } from '../index.js'

import type { LiteralValue, TypeValidator } from '..'

export const literalOf =
  <T: LiteralValue>(primitive: T): TypeValidator<T> => {
    deprwarn('calling literalOf is deprecated; fallback to literal; replace with literal validator instead; $Literal casting is not required', 'FT001')
    return literal(primitive)
  }

export const literal =
  <const T> (primitive: T): TypeValidator<T> => {
    function literal (value: mixed, _scope: string = ''): T {
      if (value === primitive) return primitive
      throw validatorError(literal, value, _scope)
    }
    literal.type = () => {
      if (isUndef(primitive)) {
        return 'void'
      }
      return JSON.stringify(primitive) || ""
    }
    literal.value = (): T => primitive;
    return literal
}