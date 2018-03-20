// @flow
const { error, getType } = require('../utils')
const { isEmpty, isObject } = require('../is')

import type { ObjectRecord, TypeValidator, TypeValidatorRecord } from '..'

exports.object = (
  function object (v) {
    if (isEmpty(v)) return {}
    if (isObject(v)) return Object.assign({}, v)
    throw error('object', typeof v)
  }
  : TypeValidator<ObjectRecord<mixed>>
)

exports.objectOf = <O: TypeValidatorRecord<*>>
  (typeObj: O): TypeValidator<$ObjMap<O, <V>(TypeValidator<V>) => V>> => {
    function object (v) {
      const o = exports.object(v)
      const reducer = isEmpty(v)
        ? (acc, key) => Object.assign(acc, { [key]: typeObj[key](v) })
        : (acc, key) => Object.assign(acc, { [key]: typeObj[key](o[key]) })
      return Object.keys(typeObj).reduce(reducer, {})
    }
    object.type = () => {
      return JSON.stringify(
        Object.keys(typeObj).reduce(
          (acc, key) => Object.assign(acc, { [key]: getType(typeObj[key]) })
        , {})
      )
    }
    return object
  }
