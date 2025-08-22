// @flow
import { getType } from '../utils.js'
import { validatorError } from '../error.js'
import { EMPTY_VALUE } from '../const.js'
import { undef } from './primitives.js'
import { object } from './object.js'
import { unionOf } from './union.js'

import type { TypeValidator } from '..'

export const mapOf = <K, V>
  (
    keyTypeFn: TypeValidator<K>,
    typeFn: TypeValidator<V>
  ): TypeValidator<{ [K]: V }> => {
    function mapOf (value: mixed, _scope: string = 'Map') {
      if (value === EMPTY_VALUE) return {}
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
