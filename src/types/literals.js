// @flow
const { validatorError } = require('../error')
const { isEmpty, isBoolean, isNumber, isString } = require('../is')

import type { LiteralValue, TypeValidator } from '..'

exports.literalOf =
  <T: LiteralValue>(primitive: T): TypeValidator<T> => {
    function literal (value: mixed, _scope: string = ''): T {
      if (isEmpty(value) || (value === primitive)) return primitive
      throw validatorError(literal, value, _scope)
    }
    literal.type = () => {
      if (isBoolean(primitive)) return `${primitive ? 'true': 'false'}`
      else return `"${primitive}"`
    }
    return literal
  }
