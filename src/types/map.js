// @flow
const { getType } = require('../utils')
const { validatorError } = require('../error')
const { isEmpty } = require('../is')
const { undef } = require('./primitives')
const { object } = require('./object')
const { unionOf } = require('./union')

import type { TypeValidator } from '..'

exports.mapOf = <K, V>
  (
    keyTypeFn: TypeValidator<K>,
    typeFn: TypeValidator<V>
  ): TypeValidator<{ [K]: V }> => {
    function mapOf (value: mixed, _scope: string = 'Map') {
      if (isEmpty(value)) return {}
      const o = object(value, _scope)
      const reducer = (acc: Object, key: string) =>
        Object.assign(
          acc,
          {
            // $FlowFixMe
            [keyTypeFn(key, `${_scope}[_]`)]
              :typeFn(o[key], `${_scope}.${key}`)
          }
        )
      return Object.keys(o).reduce(reducer, {})
    }
    mapOf.type = () => `{ [_:${getType(keyTypeFn)}]: ${getType(typeFn)} }`
    return mapOf
  }
