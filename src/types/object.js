// @flow
import { assertContext } from '../type.js'
import { getType } from '../utils.js'
import { getProperty } from '../helpers.js'
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
    if (isString(unknownAttr)) {
      _ctx.assertion = false
      assertContext(object.name, object_.type(), value, _scope, err, _ctx, `missing object property '${unknownAttr || ""}' in ${_scope} type`)
    }
    const undefAttr: ?string = typeAttrs.find((property: string) => {
      const propertyTypeFn = getProperty(typeObj, property);
      return (typeof propertyTypeFn === "function" && propertyTypeFn.name === 'maybe' && !o.hasOwnProperty(property))
    })
    if (isString(undefAttr)) {
      _ctx.assertion = false
      const d = Object.getOwnPropertyDescriptor(typeObj, undefAttr)
      const undefAttrType = d !== undefined ? d.value : d;
      // $FlowExpectedError[incompatible-call]
      const type = undefAttrType !== undefined ? getType(undefAttrType).substr(1) : "mixed"
      assertContext(
        object.name,
        `void | null | ${type}`,
        value,
        undefAttr === undefined ? _scope : `${_scope}.${undefAttr}`,
        err,
        _ctx,
        `empty object property '${undefAttr}' for ${_scope} type`,
      )
    }
    const obj = {...typeObj};

    for (const key: string of typeAttrs) {
      const typeFn = getProperty(typeObj, key)
      if (typeFn !== undefined && typeof typeFn === "function") {
      if (typeFn.name === 'optional' && !o.hasOwnProperty(key)) {
        // $FlowExpectedError[prop-missing]
        delete obj[key]
      } else {
        // $FlowExpectedError[prop-missing]
        // $FlowExpectedError[incompatible-use]
        obj[key] = typeFn(o[key], `${_scope}.${key}`)
      }
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
