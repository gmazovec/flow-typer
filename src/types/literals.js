// @flow
const { validatorError } = require('../utils')
const { isEmpty, isBoolean, isNumber, isString } = require('../is')

import type { LiteralValue, TypeValidator } from '..'

exports.literalOf =
  <T: LiteralValue>(primitive: T): TypeValidator<T> => {
    function literal (v) {
      if (isEmpty(v) || (v === primitive)) return primitive
      throw validatorError(literal, v)
    }
    literal.type = () => {
      if (isBoolean(primitive)) return `${primitive ? 'true': 'false'}`
      else return `"${primitive}"`
    }
    return literal
  }
