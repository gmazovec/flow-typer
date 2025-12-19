// @flow
import { validatorError } from '../error.js'
import { isBoolean, isNull, isUndef, isObject, isString } from '../is.js'
import { deprwarn } from '../index.js'

import type { LiteralValue, TypeValidator } from '..'

export const literalOf =
  <T: LiteralValue>(primitive: T): TypeValidator<T> => {
    deprwarn('calling literalOf is deprecated; use validator literal instead', 'FT001')
    function literal (value: mixed, _scope: string = ''): T {
      if (value === primitive) return primitive
      throw validatorError(literal, value, _scope)
    }
    literal.type = () => {
      if (isString(primitive)) {
        return `"${primitive}"`
      } else if (isNull(primitive)) {
        return 'null'
      } else if (isUndef(primitive)) {
        return 'void'
      } else if (isObject(primitive)) {
        if (primitive.constructor.name === 'Object' || primitive.constructor.name === 'Array') {
          return JSON.stringify(primitive)
        } else {
          return primitive.constructor.name;
        }
      } else {
        return primitive.toString()
      }
    }
    literal.value = () => primitive;
    return literal
  }

export const literal =
  <const T> (primitive: T): TypeValidator<T> => {
    function literal (value: mixed, _scope: string = ''): T {
      if (value === primitive) return primitive
      throw validatorError(literal, value, _scope)
    }
    literal.type = () => `"${String(primitive)}"`
    literal.value = (): T => primitive;
    return literal
}