// @flow
const { getType } = require('../utils')
const { validatorError } = require('../error')
const { isEmpty } = require('../is')

import type { TypeValidator } from '../'

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
  function tuple (value: mixed, _scope = '') {
    const cardinality = typeFuncs.length
    if (isEmpty(value)) return typeFuncs.map(fn => fn(value))
    if (Array.isArray(value) && value.length === cardinality) {
      const tupleValue = []
      for (let i = 0; i < cardinality; i += 1) {
        tupleValue.push(typeFuncs[i](value[i], _scope))
      }
      return tupleValue
    }
    throw validatorError(tuple, value, _scope)
  }
  tuple.type = () => `[${typeFuncs.map(getType).join(', ')}]`
  return tuple
}

<<<<<<< HEAD
// $FlowFixMe - $Tuple<(A, B, C, ...)[]>
const tupleOf: TupleT = tupleOf_
exports.tupleOf = tupleOf
=======
=======
exports.tupleOf3 =
  <T, U, V>(...typeFuncs: TypeValidatorsOf3<T, U, V>): TypeValidator<[T, U, V]> => {
    function tuple (value, _scope = '') {
      if (isEmpty(value)) {
        return [
          typeFuncs[0](value, _scope),
          typeFuncs[1](value, _scope),
          typeFuncs[2](value, _scope)
        ]
      }
      if (Array.isArray(value) && value.length === 3) {
        return [
          typeFuncs[0](value[0], _scope),
          typeFuncs[1](value[1], _scope),
          typeFuncs[2](value[2], _scope)
        ]
      }
      throw validatorError(tuple, value, _scope)
    }
    tuple.type = () => `[${typeFuncs.map(getType).join(', ')}]`
    return tuple
  }

exports.tupleOf4 =
  <T, U, V, Z>(...typeFuncs: TypeValidatorsOf4<T, U, V, Z>): TypeValidator<[T, U, V, Z]> => {
    function tuple (value, _scope = '') {
      if (isEmpty(value)) {
        return [
          typeFuncs[0](value, _scope),
          typeFuncs[1](value, _scope),
          typeFuncs[2](value, _scope),
          typeFuncs[3](value, _scope)
        ]
      }
      if (Array.isArray(value) && value.length === 4) {
        return [
          typeFuncs[0](value[0], _scope),
          typeFuncs[1](value[1], _scope),
          typeFuncs[2](value[2], _scope),
          typeFuncs[3](value[3], _scope)
        ]
      }
      throw validatorError(tuple, value, _scope)
    }
    tuple.type = () => `[${typeFuncs.map(getType).join(', ')}]`
    return tuple
  }

exports.tupleOf5 =
  <T, U, V, Z, X>(...typeFuncs: TypeValidatorsOf5<T, U, V, Z, X>): TypeValidator<[T, U, V, Z, X]> => {
    function tuple (value, _scope = '') {
      if (isEmpty(value)) {
        return [
          typeFuncs[0](value, _scope),
          typeFuncs[1](value, _scope),
          typeFuncs[2](value, _scope),
          typeFuncs[3](value, _scope),
          typeFuncs[4](value, _scope)
        ]
      }
      if (Array.isArray(value) && value.length === 5) {
        return [
          typeFuncs[0](value[0], _scope),
          typeFuncs[1](value[1], _scope),
          typeFuncs[2](value[2], _scope),
          typeFuncs[3](value[3], _scope),
          typeFuncs[4](value[4], _scope)
        ]
      }
      throw validatorError(tuple, value, _scope)
    }
>>>>>>> Replace TypeError with TypeValidatorError
    tuple.type = () => `[${typeFuncs.map(getType).join(', ')}]`
    return tuple
  }
>>>>>>> Add type resolvers to validators
