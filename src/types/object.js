// @flow
const { getType } = require('../utils')
const { validatorError } = require('../error')
const { isEmpty, isUndef, isObject } = require('../is')
const { undef } = require('./primitives')
const { unionOf } = require('./union')

import type { ObjectRecord, TypeValidator, TypeValidatorRecord } from '..'

function object (value: mixed, _scope: string = ''): Object {
  if (isEmpty(value)) return {}
  if (isObject(value) && !Array.isArray(value)) {
    return Object.assign({}, value)
  }
  throw validatorError(object, value, _scope)
}
object.type = () => 'Object';

exports.object = (object: TypeValidator<ObjectRecord<mixed>>);

exports.objectOf = <O: TypeValidatorRecord<*>>
  (typeObj: O, label?: string =  'Object'): TypeValidator<$ObjMap<O, <V>(TypeValidator<V>) => V>> => {
    function object_ (value: mixed, _scope: string = label): $ObjMap<O, <V>(TypeValidator<V>) => V> {
      const o = object(value, _scope)
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
          o[undefAttr],
          `${_scope}.${undefAttr}`,
          `empty object property '${undefAttr}' for ${_scope} type`,
          `void | null | ${getType(typeObj[undefAttr]).substr(1)}`,
          '-'
        )
      }

      const reducer = isEmpty(value)
        ? (acc: Object, key: string) => Object.assign(acc, { [key]: typeObj[key](value) })
        : (acc: Object, key: string) => {
          const typeFn = typeObj[key]
          if (typeFn.name === 'optional' && !o.hasOwnProperty(key)) {
            return Object.assign(acc, {})
          } else {
            return Object.assign(acc, { [key]: typeFn(o[key], `${_scope}.${key}`) })
          }
        }
      return typeAttrs.reduce(reducer, {})
    }
    object_.type = () => {
      const props = Object.keys(typeObj).map(
        (key) => typeObj[key].name === 'optional'
          ? `${key}?: ${getType(typeObj[key], { noVoid: true })}`
          : `${key}: ${getType(typeObj[key])}`
      )
      return `{|\n ${props.join(',\n  ')} \n|}`
    }
    return object_
  }

exports.optional =
  <T>(typeFn: TypeValidator<T>): TypeValidator<T | void> => {
    const unionFn = unionOf(typeFn, undef)
    function optional (v: mixed) {
      return unionFn(v)
    }
    optional.type = (opts: ?{ noVoid: boolean }) => opts && !opts.noVoid ? getType(unionFn) : getType(typeFn)
    return optional
  }
