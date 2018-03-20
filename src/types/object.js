// @flow
const { error } = require('../utils')
const { isEmpty, isObject } = require('../is')

import type { ObjectRecord, TypeValidator, TypeValidatorRecord } from '..'

exports.object =
  (v: mixed): ObjectRecord<mixed> => {
    if (isEmpty(v)) return {}
    if (isObject(v)) return Object.assign({}, v)
    throw error('object', typeof v)
  }

type TypeValidatorMap<M> = $ObjMap<M, <V>(TypeValidator<V>) => V>

exports.objectOf =
  <O: TypeValidatorRecord<*>>(typeObj: O): TypeValidator<TypeValidatorMap<O>> =>
    (v: mixed) => {
      const o = exports.object(v)
      const reducer = isEmpty(v)
        ? (acc, key) => Object.assign(acc, { [key]: typeObj[key](v) })
        : (acc, key) => Object.assign(acc, { [key]: typeObj[key](o[key]) })
      return Object.keys(typeObj).reduce(reducer, {})
    }
