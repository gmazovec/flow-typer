// @flow
const { getType } = require('../utils')
const { validatorError } = require('../error')
const { isEmpty, isObject } = require('../is')

import type { ObjectRecord, TypeValidator, TypeValidatorRecord } from '..'

exports.object = (
  function object (value, _scope = '') {
    if (isEmpty(value)) return {}
    if (isObject(value)) return Object.assign({}, value)
    throw validatorError(object, value, _scope)
  }
  : TypeValidator<ObjectRecord<mixed>>
)

exports.objectOf = <O: TypeValidatorRecord<*>>
  (typeObj: O, label?: string =  'Object'): TypeValidator<$ObjMap<O, <V>(TypeValidator<V>) => V>> => {
    function object (value, _scope = label) {
      const o = exports.object(value, _scope)
      const reducer = isEmpty(value)
        ? (acc, key) => Object.assign(acc, { [key]: typeObj[key](value) })
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
