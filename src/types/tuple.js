// @flow
import { getType } from '../utils.js'
import { validatorError, validatorTypeError } from '../error.js'
import { EMPTY_VALUE } from '../const.js'

import type { TypeValidator } from '../'

type V<T> = TypeValidator<T>
type TupleT =
    (<A>(V<A>) => V<[A]>)
  & (<A, B>(V<A>, V<B>) => V<[A, B]>)
  & (<A, B, C>(V<A>, V<B>, V<C>) => V<[A, B, C]>)
  & (<A, B, C, D>(V<A>, V<B>, V<C>, V<D>) => V<[A, B, C, D]>)
  & (<A, B, C, D, E>(V<A>, V<B>, V<C>, V<D>, V<E>) => V<[A, B, C, D, E]>)
  & (<A, B, C, D, E, F>(V<A>, V<B>, V<C>, V<D>, V<E>, V<F>) => V<[A, B, C, D, E, F]>)
  & (<A, B, C, D, E, F, G>(V<A>, V<B>, V<C>, V<D>, V<E>, V<F>, V<G>) => V<[A, B, C, D, E, F, G]>)
  & (<A, B, C, D, E, F, G, H>(V<A>, V<B>, V<C>, V<D>, V<E>, V<F>, V<G>, V<H>) => V<[A, B, C, D, E, F, G, H]>)
  & (<A, B, C, D, E, F, G, H, I>(V<A>, V<B>, V<C>, V<D>, V<E>, V<F>, V<G>, V<H>, V<I>) => V<[A, B, C, D, E, F, G, H, I]>)
  & (<A, B, C, D, E, F, G, H, I, J>(V<A>, V<B>, V<C>, V<D>, V<E>, V<F>, V<G>, V<H>, V<I>, V<J>) => V<[A, B, C, D, E, F, G, H, I, J]>)

export const tupleOf: TupleT = function tupleOf_ (...typeFuncs) {
  // $FlowExpectedError[recursive-definition]
  function tuple (value: mixed, _scope: string = '') {
    const cardinality = typeFuncs.length
    if (value === EMPTY_VALUE) return typeFuncs.map(fn => fn(value))
    if (Array.isArray(value) && value.length === cardinality) {
      const tupleValue = []
      for (let i = 0; i < cardinality; i += 1) {
        tupleValue.push(typeFuncs[i](value[i], _scope))
      }
      return tupleValue
    }
    throw validatorError(tuple, value, _scope)
  }
  tuple.type = () => `[${typeFuncs.map(fn => getType(fn)).join(', ')}]`
  return tuple
}

type Tuple2TypeValidator = <A, B> (TypeValidator<A>, TypeValidator<B>) => TypeValidator<[A, B]>

export const tuple2: Tuple2TypeValidator = function (va, vb) {
  function tuple (value: mixed, _scope: string = '') {
    if (value === EMPTY_VALUE) return [va(value, _scope), vb(value, _scope)]
    if (Array.isArray(value) && value.length === 2) {
      return [va(value[0], _scope), vb(value[1], _scope)]
    }
    throw validatorTypeError('tuple', `[${getType(va)}, ${getType(vb)}]`, value, _scope)
  }
  tuple.type = () => `[${getType(va)}, ${getType(vb)}]`
  return tuple
}

type Tuple3TypeValidator = <A, B, C> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>) => TypeValidator<[A, B, C]>

export const tuple3: Tuple3TypeValidator = function (va, vb, vc) {
  function tuple (value: mixed, _scope: string = '') {
    if (value === EMPTY_VALUE) return [va(value, _scope), vb(value, _scope), vc(value, _scope)]
    if (Array.isArray(value) && value.length === 3) {
      return [va(value[0], _scope), vb(value[1], _scope), vc(value[2], _scope)]
    }
    throw validatorTypeError('tuple', `[${getType(va)}, ${getType(vb)}, ${getType(vc)}]`, value, _scope)
  }
  tuple.type = () => `[${getType(va)}, ${getType(vb)}, ${getType(vc)}]`
  return tuple
}

type Tuple4TypeValidator = <A, B, C, D> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>, TypeValidator<D>) => TypeValidator<[A, B, C, D]>

export const tuple4: Tuple4TypeValidator = function (va, vb, vc, vd) {
  function tuple (value: mixed, _scope: string = '') {
    if (value === EMPTY_VALUE) return [va(value, _scope), vb(value, _scope), vc(value, _scope), vd(value, _scope)]
    if (Array.isArray(value) && value.length === 4) {
      return [va(value[0], _scope), vb(value[1], _scope), vc(value[2], _scope), vd(value[3], _scope)]
    }
    throw validatorTypeError('tuple', `[${getType(va)}, ${getType(vb)}, ${getType(vc)}, ${getType(vd)}]`, value, _scope)
  }
  tuple.type = () => `[${getType(va)}, ${getType(vb)}, ${getType(vc)}, ${getType(vd)}]`
  return tuple
}

type Tuple5TypeValidator = <A, B, C, D, E> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>, TypeValidator<D>, TypeValidator<E>) => TypeValidator<[A, B, C, D, E]>

export const tuple5: Tuple5TypeValidator = function (va, vb, vc, vd, ve) {
  function tuple (value: mixed, _scope: string = '') {
    if (value === EMPTY_VALUE) return [va(value, _scope), vb(value, _scope), vc(value, _scope), vd(value, _scope), ve(value, _scope)]
    if (Array.isArray(value) && value.length === 5) {
      return [va(value[0], _scope), vb(value[1], _scope), vc(value[2], _scope), vd(value[3], _scope), ve(value[4], _scope)]
    }
    throw validatorTypeError('tuple', `[${getType(va)}, ${getType(vb)}, ${getType(vc)}, ${getType(vd)}, ${getType(ve)}]`, value, _scope)
  }
  tuple.type = () => `[${getType(va)}, ${getType(vb)}, ${getType(vc)}, ${getType(vd)}, ${getType(ve)}]`
  return tuple
}

type Tuple6TypeValidator = <A, B, C, D, E, F> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>, TypeValidator<D>, TypeValidator<E>, TypeValidator<F>) => TypeValidator<[A, B, C, D, E, F]>

export const tuple6: Tuple6TypeValidator = function (va, vb, vc, vd, ve, vf) {
  function tuple (value: mixed, _scope: string = '') {
    if (value === EMPTY_VALUE) return [va(value, _scope), vb(value, _scope), vc(value, _scope), vd(value, _scope), ve(value, _scope), vf(value, _scope)]
    if (Array.isArray(value) && value.length === 6) {
      return [va(value[0], _scope), vb(value[1], _scope), vc(value[2], _scope), vd(value[3], _scope), ve(value[4], _scope), vf(value[5], _scope)]
    }
    throw validatorTypeError('tuple', `[${getType(va)}, ${getType(vb)}, ${getType(vc)}, ${getType(vd)}, ${getType(ve)}, ${getType(vf)}]`, value, _scope)
  }
  tuple.type = () => `[${getType(va)}, ${getType(vb)}, ${getType(vc)}, ${getType(vd)}, ${getType(ve)}, ${getType(vf)}]`
  return tuple
}
