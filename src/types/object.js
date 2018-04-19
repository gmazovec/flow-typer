// @flow
const { getType } = require('../utils')
const { validatorError } = require('../error')
const { isEmpty, isUndef, isObject } = require('../is')
const { undef } = require('./primitives')
const { unionOf } = require('./union')

import type { ObjectRecord, TypeValidator, TypeValidatorRecord } from '..'

exports.object = (
  function object (value, _scope = '') {
    if (isEmpty(value)) return {}
    if (isObject(value) && !Array.isArray(value)) {
      return Object.assign({}, value)
    }
    throw validatorError(object, value, _scope)
  }
  : TypeValidator<ObjectRecord<mixed>>
)

exports.objectOf = <O: TypeValidatorRecord<*>>
  (typeObj: O, label?: string =  'Object'): TypeValidator<$ObjMap<O, <V>(TypeValidator<V>) => V>> => {
    function object (value, _scope = label) {
      const o = exports.object(value, _scope)
      const typeAttrs = Object.keys(typeObj)
      const unknownAttr = Object.keys(o).find(attr => !typeAttrs.includes(attr))
      if (unknownAttr) {
        throw validatorError(
          object,
          value,
          _scope,
          `missing object property '${unknownAttr}' in ${_scope} type`
        )
      }
      const undefAttr = typeAttrs.find(property => {
        const propertyTypeFn = typeObj[property]
        return (propertyTypeFn.name === 'maybe' && !o.hasOwnProperty(property))
      })
      if (undefAttr) {
        throw validatorError(
          object,
          value,
          _scope,
          `empty object property '${undefAttr}' for ${_scope} type`
        )
      }

      const reducer = isEmpty(value)
        ? (acc, key) => Object.assign(acc, { [key]: typeObj[key](value) })
        : (acc, key) => {
          const typeFn = typeObj[key]
          if (typeFn.name === 'optional' && !o.hasOwnProperty(key)) {
            return Object.assign(acc, {})
          } else {
            return Object.assign(acc, { [key]: typeFn(o[key], `${_scope}.${key}`) })
          }
        }
      return typeAttrs.reduce(reducer, {})
    }
    object.type = () => {
      const props = Object.keys(typeObj).map(
        (key) => typeObj[key].name === 'optional'
          ? `${key}?: ${getType(typeObj[key], { noVoid: true })}`
          : `${key}: ${getType(typeObj[key])}`
      )
      return `{|\n ${props.join(',\n  ')} \n|}`
    }
    return object
  }

exports.optional =
  <T>(typeFn: TypeValidator<T>): TypeValidator<T | void> => {
    const unionFn = unionOf(typeFn, undef)
    function optional (v) {
      return unionFn(v)
    }
    optional.type = ({ noVoid }) => !noVoid ? getType(unionFn) : getType(typeFn)
    return optional
  }
