// @flow
const { getType } = require('../utils')
const { validatorError } = require('../error')
const { isEmpty, isObject } = require('../is')

import type { ObjectRecord, TypeValidator, TypeValidatorRecord } from '..'

exports.object = (
  function object (v, _scope = '') {
    if (isEmpty(v)) return {}
    if (isObject(v)) return Object.assign({}, v)
    throw validatorError(object, v, _scope)
  }
  : TypeValidator<ObjectRecord<mixed>>
)

exports.objectOf = <O: TypeValidatorRecord<*>>
  (typeObj: O, label?: string =  'Object'): TypeValidator<$ObjMap<O, <V>(TypeValidator<V>) => V>> => {
    function object (v, _scope = label) {
      const o = exports.object(v, _scope)
      const reducer = isEmpty(v)
        ? (acc, key) => Object.assign(acc, { [key]: typeObj[key](v) })
        : (acc, key) => Object.assign(acc, { [key]: typeObj[key](o[key], `${_scope}.${key}`) })
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
