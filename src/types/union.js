// @flow
const { error } = require('../utils')

import type { TypeValidator } from '..'

type V<T> = (mixed) => T
type UnionT =
    (<A>(V<A>) => TypeValidator<A>)
  & (<A, B>(V<A>, V<B>) => TypeValidator<A | B>)
  & (<A, B, C>(V<A>, V<B>, V<C>) => TypeValidator<A | B | C>)
  & (<A, B, C, D>(V<A>, V<B>, V<C>, V<D>) => TypeValidator<A | B | C | D>)
  & (<A, B, C, D, E>(V<A>, V<B>, V<C>, V<D>, V<E>) => TypeValidator<A | B | C | D | E>)
  & (<A, B, C, D, E, F>(V<A>, V<B>, V<C>, V<D>, V<E>, V<F>) => TypeValidator<A | B | C | D | E | F>)
  & (<A, B, C, D, E, F, G>(V<A>, V<B>, V<C>, V<D>, V<E>, V<F>, V<G>) => TypeValidator<A | B | C | D | E | F | G>)
  & (<A, B, C, D, E, F, G, H>(V<A>, V<B>, V<C>, V<D>, V<E>, V<F>, V<G>, V<H>) => TypeValidator<A | B | C | D | E | F | G | H>)
  & (<A, B, C, D, E, F, G, H, I>(V<A>, V<B>, V<C>, V<D>, V<E>, V<F>, V<G>, V<H>, V<I>) => TypeValidator<A | B | C | D | E | F | G | H | I>)
  & (<A, B, C, D, E, F, G, H, I, J>(V<A>, V<B>, V<C>, V<D>, V<E>, V<F>, V<G>, V<H>, V<I>, V<J>) => TypeValidator<A | B | C | D | E | F | G | H | I | J>)

function unionOf_ (...typeFuncs) {
  return function union (v: mixed) {
    for (const typeFn of typeFuncs) {
      try {
        return typeFn(v)
      } catch (_) {}
    }
    throw error('union', typeof v)
  }
}
// $FlowFixMe
const unionOf: UnionT = (unionOf_);
exports.unionOf = unionOf
