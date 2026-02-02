// @flow
import { assertContext } from '../type.js'
import { getType } from '../utils.js'
import { validatorError } from '../error.js'
import { isUndef, isString, isObject } from '../is.js'
import { undef } from './primitives.js'
import { union2 } from './union.js'

import type { ObjectRecord, TypeValidator, TypeValidatorRecord, TypeAssertError, AssertionContext } from '..'

function toObject (value: mixed, ctx: AssertionContext): {...} {
  if (isObject(value) && !Array.isArray(value)) {
    return Object.assign({}, value)
  }
  ctx.assertion = false
  return {}
}

function _object (value: mixed, _scope: string = '', err?: TypeAssertError[], ctx?: AssertionContext = {}): {...} {
  const v = toObject(value, ctx);
  assertContext("object", _object.type(), value, _scope, err, ctx);
  return v;
}
_object.type = () => 'Object';
_object.value = () => ({});

export const object = (_object: TypeValidator<ObjectRecord<mixed>>);

export const objectOf = function t_object <T: {...}> (typeObj: T, label?: string =  'Object') /*: TypeValidator<{ [key in keyof T]: ReturnType<T[key]> }> */ {
  function object_ (value: mixed, _scope: string = label, err?: TypeAssertError[], _ctx: AssertionContext = {}) /*: { [key in keyof T]: ReturnType<T[key]> } */ {
    const o = object(value, _scope, err, _ctx);
    assertContext(object.name, object_.type(), value, _scope, err, _ctx);
    const typeAttrs = Object.keys(typeObj)
    const unknownAttr = Object.keys(o).find(attr => !typeAttrs.includes(attr))
    let ctx;
    assertContext(object.name, object_.type(), value, _scope, err, ctx = { assertion: !isString(unknownAttr) }, `missing object property '${unknownAttr || ""}' in ${_scope} type`)
    if (ctx.assertion === false) {
      _ctx.assertion = false;
    }

    const undefAttr = typeAttrs.find(property => {
      const propertyTypeFn = typeObj[property]
      return (propertyTypeFn.name === 'maybe' && !o.hasOwnProperty(property))
    })
    assertContext(
      object.name,
      `void | null${undefAttr === undefined ? '' : ' | ' + getType(typeObj[undefAttr]).substr(1)}`,
      value,
      undefAttr === undefined ? _scope : `${_scope}.${undefAttr}`,
      err,
      ctx = { assertion: !isString(undefAttr) },
      `empty object property '${undefAttr || ""}' for ${_scope} type`,
    )
    if (ctx.assertion === false) {
      _ctx.assertion = false
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
    const unionFn = union2(typeFn, undef)
    function optional (v: mixed) {
      return unionFn(v)
    }
    optional.type = (opts: ?{ noVoid: boolean }) => opts && !opts.noVoid ? getType(unionFn) : getType(typeFn)
    optional.value = (): T | void => unionFn.value();
    return optional
  }
