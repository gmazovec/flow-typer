// @flow
import { getType } from '../utils.js'
import { validatorError } from '../error.js'
import { deprwarn } from '../index.js'

import type { TypeValidator } from '..'

type V<T> = TypeValidator<T>
type UnionT =
    (<A>(V<A>) => V<A>)
  & (<A, B>(V<A>, V<B>) => V<A | B>)
  & (<A, B, C>(V<A>, V<B>, V<C>) => V<A | B | C>)
  & (<A, B, C, D>(V<A>, V<B>, V<C>, V<D>) => V<A | B | C | D>)
  & (<A, B, C, D, E>(V<A>, V<B>, V<C>, V<D>, V<E>) => V<A | B | C | D | E>)
  & (<A, B, C, D, E, F>(V<A>, V<B>, V<C>, V<D>, V<E>, V<F>) => V<A | B | C | D | E | F>)
  & (<A, B, C, D, E, F, G>(V<A>, V<B>, V<C>, V<D>, V<E>, V<F>, V<G>) => V<A | B | C | D | E | F | G>)
  & (<A, B, C, D, E, F, G, H>(V<A>, V<B>, V<C>, V<D>, V<E>, V<F>, V<G>, V<H>) => V<A | B | C | D | E | F | G | H>)
  & (<A, B, C, D, E, F, G, H, I>(V<A>, V<B>, V<C>, V<D>, V<E>, V<F>, V<G>, V<H>, V<I>) => V<A | B | C | D | E | F | G | H | I>)
  & (<A, B, C, D, E, F, G, H, I, J>(V<A>, V<B>, V<C>, V<D>, V<E>, V<F>, V<G>, V<H>, V<I>, V<J>) => V<A | B | C | D | E | F | G | H | I | J>)

export const unionOf: UnionT = function unionOf_ (...typeFuncs) {
  deprwarn('calling unionOf is deprecated; use validators with arity, ex. unionOf2, ... unionOf6', 'DEP003')
  // $FlowExpectedError[recursive-definition]
  function union (value: mixed, _scope: string = '') {
    for (const typeFn of typeFuncs) {
      try {
        return typeFn(value, _scope)
      } catch (_) {}
    }
    throw validatorError(union, value, _scope)
  }
  // $FlowExpectedError[incompatible-call]
  union.type = () => `(${typeFuncs.map(fn => getType(fn)).join(' | ')})`
  union.value = () => typeFuncs.map(fn => fn.value());
  return union
}

type Union2TypeValidator = <A, B> (TypeValidator<A>, TypeValidator<B>) => TypeValidator<A | B>

export const union2: Union2TypeValidator = function (va, vb) {
  function union (value: mixed, _scope: string = '') {
    return va(value, _scope) ?? vb(value, _scope);
  }
  union.type = () => `(${getType(va)} | ${getType(vb)})`
  union.value = () => va.value() ?? vb.value();
  return union
}

type Union3TypeValidator = <A, B, C> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>) => TypeValidator<A | B | C>

export const union3: Union3TypeValidator = function (va, vb, vc) {
  function union (value: mixed, _scope: string = '') {
    return va(value, _scope) ?? vb(value, _scope) ?? vc(value, _scope)
  }
  union.type = () => `${getType(va)} | ${getType(vb)} | ${getType(vc)}`
  union.value = () => va.value() ?? vb.value() ?? vc.value();
  return union
}

type Union4TypeValidator = <A, B, C, D> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>, TypeValidator<D>) => TypeValidator<A | B | C | D>

export const union4: Union4TypeValidator = function (va, vb, vc, vd) {
  function union (value: mixed, _scope: string = '') {
    return va(value, _scope) ?? vb(value, _scope) ?? vc(value, _scope) ?? vd(value, _scope)
  }
  union.type = () => `${getType(va)} | ${getType(vb)} | ${getType(vc)} | ${getType(vd)}`
  union.value = () => va.value() ?? vb.value() ?? vc.value() ?? vd.value();
  return union
}

type Union5TypeValidator = <A, B, C, D, E> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>, TypeValidator<D>, TypeValidator<E>) => TypeValidator<A | B | C | D | E>

export const union5: Union5TypeValidator = function (va, vb, vc, vd, ve) {
  function union (value: mixed, _scope: string = '') {
    return va(value, _scope) ?? vb(value, _scope) ?? vc(value, _scope) ?? vd(value, _scope) ?? ve(value, _scope);
  }
  union.type = () => `${getType(va)} | ${getType(vb)} | ${getType(vc)} | ${getType(vd)} | ${getType(ve)}`
  union.value = () => va.value() ?? vb.value() ?? vc.value() ?? vd.value() ?? ve.value();
  return union
}

type Union6TypeValidator = <A, B, C, D, E, F> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>, TypeValidator<D>, TypeValidator<E>, TypeValidator<F>) => TypeValidator<A | B | C | D | E | F>

export const union6: Union6TypeValidator = function (va, vb, vc, vd, ve, vf) {
  function union (value: mixed, _scope: string = '') {
    return va(value, _scope) ?? vb(value, _scope) ?? vc(value, _scope) ?? vd(value, _scope) ?? ve(value, _scope) ?? vf(value, _scope);
  }
  union.type = () => `(${getType(va)} | ${getType(vb)}) | ${getType(vc)} | ${getType(vd)} | ${getType(ve)} | ${getType(vf)}`
  union.value = () => va.value() ?? vb.value() ?? vc.value() ?? vd.value() ?? ve.value() ?? vf.value();
  return union
}

