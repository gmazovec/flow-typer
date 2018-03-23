// @flow
const { error } = require('../utils')
const { isEmpty } = require('../is')

import type {
  TypeValidator,
  TypeValidatorsOf2,
  TypeValidatorsOf3,
  TypeValidatorsOf4,
  TypeValidatorsOf5
} from '../'

type V<T> = TypeValidator<T>
type TupleT =
    (<A>(V<A>) => TypeValidator<[A]>)
  & (<A, B>(V<A>, V<B>) => TypeValidator<[A, B]>)
  & (<A, B, C>(V<A>, V<B>, V<C>) => TypeValidator<[A, B, C]>)
  & (<A, B, C, D>(V<A>, V<B>, V<C>, V<D>) => TypeValidator<[A, B, C, D]>)
  & (<A, B, C, D, E>(V<A>, V<B>, V<C>, V<D>, V<E>) => TypeValidator<[A, B, C, D, E]>)
  & (<A, B, C, D, E, F>(V<A>, V<B>, V<C>, V<D>, V<E>, V<F>) => TypeValidator<[A, B, C, D, E, F]>)
  & (<A, B, C, D, E, F, G>(V<A>, V<B>, V<C>, V<D>, V<E>, V<F>, V<G>) => TypeValidator<[A, B, C, D, E, F, G]>)
  & (<A, B, C, D, E, F, G, H>(V<A>, V<B>, V<C>, V<D>, V<E>, V<F>, V<G>, V<H>) => TypeValidator<[A, B, C, D, E, F, G, H]>)
  & (<A, B, C, D, E, F, G, H, I>(V<A>, V<B>, V<C>, V<D>, V<E>, V<F>, V<G>, V<H>, V<I>) => TypeValidator<[A, B, C, D, E, F, G, H, I]>)
  & (<A, B, C, D, E, F, G, H, I, J>(V<A>, V<B>, V<C>, V<D>, V<E>, V<F>, V<G>, V<H>, V<I>, V<J>) => TypeValidator<[A, B, C, D, E, F, G, H, I, J]>)

function tupleOf_ (...typeFuncs) {
  return (v: mixed) => {
    const cardinality = typeFuncs.length
    if (isEmpty(v)) return typeFuncs.map(fn => fn(v))
    if (Array.isArray(v) && v.length === cardinality) {
      const value = []
      for (let i = 0; i < cardinality; i += 1) {
        value.push(typeFuncs[i](v[i]))
      }
      return value
    }
    throw error(`tuple with cardinality of ${cardinality}`, typeof v)
  }
}

// $FlowFixMe - $Tuple<(A, B, C, ...)[]>
const tupleOf: TupleT = tupleOf_
exports.tupleOf = tupleOf
