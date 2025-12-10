// @flow
import { getType } from '../utils.js'
import { validatorError } from '../error.js'
import { isUndef, isObject } from '../is.js'
import { undef } from './primitives.js'
import { unionOf } from './union.js'

import type { ObjectRecord, TypeValidator, TypeValidatorRecord } from '..'

function _object (value: mixed, _scope: string = ''): {...} {
  if (isObject(value) && !Array.isArray(value)) {
    return Object.assign({}, value)
  }
  throw validatorError(object, value, _scope)
}
_object.type = () => 'Object';
_object.value = () => ({});

export const object = (_object: TypeValidator<ObjectRecord<mixed>>);

export const objectOf = function t_object <T: {...}> (typeObj: T, label?: string =  'Object') /*: TypeValidator<{ [key in keyof T]: ReturnType<T[key]> }> */ {
  function object_ (value: mixed, _scope: string = label) /*: { [key in keyof T]: ReturnType<T[key]> } */ {
    const o = object(value, _scope)
    const typeAttrs = Object.keys(typeObj)
    const unknownAttr = Object.keys(o).find(attr => !typeAttrs.includes(attr))
    if (typeof unknownAttr === "string") {
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
    if (typeof undefAttr === "string") {
      throw validatorError(
        object,
        o[undefAttr],
        `${_scope}.${undefAttr}`,
        `empty object property '${undefAttr}' for ${_scope} type`,
        `void | null | ${getType(typeObj[undefAttr]).substr(1)}`,
        '-'
      )
    }

    const obj = {...typeObj};

    for (const key of typeAttrs) {
      const typeFn = typeObj[key]
      if (typeFn.name === 'optional' && !o.hasOwnProperty(key)) {
        delete obj[key]
      } else {
        obj[key] = typeFn(o[key], `${_scope}.${key}`)
      }
    }

    return obj;
  }
  object_.type = () => {
    const props = Object.keys(typeObj).map(
      (key) => typeObj[key].name === 'optional'
        ? `${key}?: ${getType(typeObj[key], { noVoid: true })}`
        : `${key}: ${getType(typeObj[key])}`
    )
    return `{\n ${props.join(',\n  ')} \n}`
  }
  object_.value = () => {
    const obj = {...typeObj};
    for (const key of Object.keys(typeObj)) {
      if (typeof typeObj[key] === "function") {
        obj[key] = typeObj[key].value();
      }
    }
    return obj;
  };
  return object_
}

export const optional =
  <T>(typeFn: TypeValidator<T>): TypeValidator<T | void> => {
    const unionFn = unionOf(typeFn, undef)
    function optional (v: mixed) {
      return unionFn(v)
    }
    optional.type = (opts: ?{ noVoid: boolean }) => opts && !opts.noVoid ? getType(unionFn) : getType(typeFn)
    optional.value = (): T | void => unionFn.value();
    return optional
  }
