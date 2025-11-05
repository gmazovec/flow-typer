// @flow
import { validatorError } from '../error.js'
import { isBoolean } from '../is.js'
import { EMPTY_VALUE } from '../const.js'

import type { LiteralValue, TypeValidator } from '..'

export const literalOf =
  <T: LiteralValue>(primitive: T): TypeValidator<T> => {
    function literal (value: mixed, _scope: string = ''): T {
      if (value === EMPTY_VALUE || (value === primitive)) return primitive
      throw validatorError(literal, value, _scope)
    }
    literal.type = () => {
      if (isBoolean(primitive)) return `${primitive ? 'true': 'false'}`
      else return `"${primitive}"`
    }
    return literal
  }
