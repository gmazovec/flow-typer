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

exports.tupleOf1 =
  <T>(...typeFuncs: [TypeValidator<T>]): TypeValidator<[T]> =>
    (v: mixed) => {
      if (isEmpty(v)) return [typeFuncs[0](v)]
      if (Array.isArray(v) && v.length === 1) {
        return [typeFuncs[0](v[0])]
      }
      throw error('tuple with cardinality of 1', typeof v)
    }

exports.tupleOf2 =
  <T, U>(...typeFuncs: TypeValidatorsOf2<T, U>): TypeValidator<[T, U]> =>
    (v: mixed) => {
      if (isEmpty(v)) return [typeFuncs[0](v), typeFuncs[1](v)]
      if (Array.isArray(v) && v.length === 2) {
        return [
          typeFuncs[0](v[0]),
          typeFuncs[1](v[1])
        ]
      }
      throw error('tuple with cardinality of 2', typeof v)
    }

exports.tupleOf3 =
  <T, U, V>(...typeFuncs: TypeValidatorsOf3<T, U, V>): TypeValidator<[T, U, V]> =>
    (v: mixed) => {
      if (isEmpty(v)) {
        return [typeFuncs[0](v), typeFuncs[1](v), typeFuncs[2](v)]
      }
      if (Array.isArray(v) && v.length === 3) {
        return [
          typeFuncs[0](v[0]),
          typeFuncs[1](v[1]),
          typeFuncs[2](v[2])
        ]
      }
      throw error('tuple with cardinality of 3', typeof v)
    }

exports.tupleOf4 =
  <T, U, V, Z>(...typeFuncs: TypeValidatorsOf4<T, U, V, Z>): TypeValidator<[T, U, V, Z]> =>
    (v: mixed) => {
      if (isEmpty(v)) {
        return [
          typeFuncs[0](v),
          typeFuncs[1](v),
          typeFuncs[2](v),
          typeFuncs[3](v)
        ]
      }
      if (Array.isArray(v) && v.length === 4) {
        return [
          typeFuncs[0](v[0]),
          typeFuncs[1](v[1]),
          typeFuncs[2](v[2]),
          typeFuncs[3](v[3])
        ]
      }
      throw error('tuple with cardinality of 4', typeof v)
    }

exports.tupleOf5 =
  <T, U, V, Z, X>(...typeFuncs: TypeValidatorsOf5<T, U, V, Z, X>): TypeValidator<[T, U, V, Z, X]> =>
    (v: mixed) => {
      if (isEmpty(v)) {
        return [
          typeFuncs[0](v),
          typeFuncs[1](v),
          typeFuncs[2](v),
          typeFuncs[3](v),
          typeFuncs[4](v)
        ]
      }
      if (Array.isArray(v) && v.length === 5) {
        return [
          typeFuncs[0](v[0]),
          typeFuncs[1](v[1]),
          typeFuncs[2](v[2]),
          typeFuncs[3](v[3]),
          typeFuncs[4](v[4])
        ]
      }
      throw error('tuple with cardinality of 5', typeof v)
    }
