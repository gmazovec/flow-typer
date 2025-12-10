// @flow
import { validatorError } from '../error.js'
import { isBoolean } from '../is.js'
import { deprwarn } from '../index.js'

import type { LiteralValue, TypeValidator } from '..'

export const literalOf =
  <T: LiteralValue>(primitive: T): TypeValidator<T> => {
    deprwarn('calling literalOf is deprecated; use validator literal instead', 'DEP001')
    function literal (value: mixed, _scope: string = ''): T {
      if (value === primitive) return primitive
      throw validatorError(literal, value, _scope)
    }
    literal.type = () => {
      if (isBoolean(primitive)) return `${primitive ? 'true': 'false'}`
      else return `"${primitive}"`
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