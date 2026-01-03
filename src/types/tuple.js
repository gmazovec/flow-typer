// @flow
import { getType } from '../utils.js'
import { validatorError, validatorTypeError } from '../error.js'
import { deprwarn } from '../index.js'

import type { TypeValidator } from '../'

export const tupleOf: Tuple2TypeValidator = function tupleOf_ (va, vb) {
  deprwarn('calling tupleOf is deprecated; fallback to tupleOf2; use validators with arity, ex. tupleOf2, ... tupleOf6', 'FT002')
  return tuple2(va, vb)
}

type Tuple2TypeValidator = <A, B> (TypeValidator<A>, TypeValidator<B>) => TypeValidator<[A, B]>

export const tuple2: Tuple2TypeValidator = function (va, vb) {
  function tuple (value: mixed, _scope: string = '') {
    if (Array.isArray(value) && value.length === 2) {
      return [va(value[0], _scope), vb(value[1], _scope)]
    }
    throw validatorTypeError('tuple', `[${getType(va)}, ${getType(vb)}]`, value, _scope)
  }
  tuple.type = () => `[${getType(va)}, ${getType(vb)}]`
  tuple.value = () => [va.value(), vb.value()];
  return tuple
}

type Tuple3TypeValidator = <A, B, C> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>) => TypeValidator<[A, B, C]>

export const tuple3: Tuple3TypeValidator = function (va, vb, vc) {
  function tuple (value: mixed, _scope: string = '') {
    if (Array.isArray(value) && value.length === 3) {
      return [va(value[0], _scope), vb(value[1], _scope), vc(value[2], _scope)]
    }
    throw validatorTypeError('tuple', `[${getType(va)}, ${getType(vb)}, ${getType(vc)}]`, value, _scope)
  }
  tuple.type = () => `[${getType(va)}, ${getType(vb)}, ${getType(vc)}]`
  tuple.value = () => [va.value(), vb.value(), vc.value()];
  return tuple
}

type Tuple4TypeValidator = <A, B, C, D> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>, TypeValidator<D>) => TypeValidator<[A, B, C, D]>

export const tuple4: Tuple4TypeValidator = function (va, vb, vc, vd) {
  function tuple (value: mixed, _scope: string = '') {
    if (Array.isArray(value) && value.length === 4) {
      return [va(value[0], _scope), vb(value[1], _scope), vc(value[2], _scope), vd(value[3], _scope)]
    }
    throw validatorTypeError('tuple', `[${getType(va)}, ${getType(vb)}, ${getType(vc)}, ${getType(vd)}]`, value, _scope)
  }
  tuple.type = () => `[${getType(va)}, ${getType(vb)}, ${getType(vc)}, ${getType(vd)}]`
  tuple.value = () => [va.value(), vb.value(), vc.value(), vd.value()];
  return tuple
}

type Tuple5TypeValidator = <A, B, C, D, E> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>, TypeValidator<D>, TypeValidator<E>) => TypeValidator<[A, B, C, D, E]>

export const tuple5: Tuple5TypeValidator = function (va, vb, vc, vd, ve) {
  function tuple (value: mixed, _scope: string = '') {
    if (Array.isArray(value) && value.length === 5) {
      return [va(value[0], _scope), vb(value[1], _scope), vc(value[2], _scope), vd(value[3], _scope), ve(value[4], _scope)]
    }
    throw validatorTypeError('tuple', `[${getType(va)}, ${getType(vb)}, ${getType(vc)}, ${getType(vd)}, ${getType(ve)}]`, value, _scope)
  }
  tuple.type = () => `[${getType(va)}, ${getType(vb)}, ${getType(vc)}, ${getType(vd)}, ${getType(ve)}]`
  tuple.value = () => [va.value(), vb.value(), vc.value(), vd.value(), ve.value()];
  return tuple
}

type Tuple6TypeValidator = <A, B, C, D, E, F> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>, TypeValidator<D>, TypeValidator<E>, TypeValidator<F>) => TypeValidator<[A, B, C, D, E, F]>

export const tuple6: Tuple6TypeValidator = function (va, vb, vc, vd, ve, vf) {
  function tuple (value: mixed, _scope: string = '') {
    if (Array.isArray(value) && value.length === 6) {
      return [va(value[0], _scope), vb(value[1], _scope), vc(value[2], _scope), vd(value[3], _scope), ve(value[4], _scope), vf(value[5], _scope)]
    }
    throw validatorTypeError('tuple', `[${getType(va)}, ${getType(vb)}, ${getType(vc)}, ${getType(vd)}, ${getType(ve)}, ${getType(vf)}]`, value, _scope)
  }
  tuple.type = () => `[${getType(va)}, ${getType(vb)}, ${getType(vc)}, ${getType(vd)}, ${getType(ve)}, ${getType(vf)}]`
  tuple.value = () => [va.value(), vb.value(), vc.value(), vd.value(), ve.value(), vf.value()];
  return tuple
}
