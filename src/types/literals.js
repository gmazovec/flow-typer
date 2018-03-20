// @flow
const { error } = require('../utils')
const { isEmpty } = require('../is')

import type { LiteralValue, TypeValidator } from '..'

exports.literalOf =
  <T: LiteralValue>(primitive: T): TypeValidator<T> =>
    function literal (v) {
      if (isEmpty(v) || (v === primitive)) return primitive
      throw error(`${typeof primitive} primitive literal`, typeof v)
    }
