// @flow

// types

export type Literal = null | void | boolean | number | string
export type ObjectRecord = { [string]: mixed }
export type TypeValidator<T> = (mixed) => T
export type TypeMaybeValidator<T> = (mixed) => ?T
export type TypeArrayValidator<T> = (mixed) => T[]

type TypeValidatorsOf2<T, U> = [
  TypeValidator<T>,
  TypeValidator<U>
]

type TypeValidatorsOf3<T, U, V> = [
  TypeValidator<T>,
  TypeValidator<U>,
  TypeValidator<V>
]

type TypeValidatorsOf4<T, U, V, Z> = [
  TypeValidator<T>,
  TypeValidator<U>,
  TypeValidator<V>,
  TypeValidator<Z>,
]

type TypeValidatorsOf5<T, U, V, Z, X> = [
  TypeValidator<T>,
  TypeValidator<U>,
  TypeValidator<V>,
  TypeValidator<Z>,
  TypeValidator<X>
]

// error helpers

function error (expected, actual) {
  return new TypeError(`invalid '${actual}' value type; '${expected}' type expected`)
}

// type helpers

// This symbol can be passed to validators to indicate empty value. Validators
// will return default value for specific type. The default values are used to
// construct inferred types.

const EMTPY_VALUE = Symbol('@@empty')

const isEmpty =
  (v: mixed): boolean %checks =>
    v === EMTPY_VALUE

const isNil = exports.isNil =
  (v: mixed): boolean %checks =>
    v === null

const isUndef = exports.isUndef =
  (v: mixed): boolean %checks =>
    typeof v === 'undefined'

const isBoolean = exports.isBoolean =
  (v: mixed): boolean %checks =>
    typeof v === 'boolean'

const isNumber = exports.isNumber =
  (v: mixed): boolean %checks =>
    typeof v === 'number'

const isString = exports.isString =
  (v: mixed): boolean %checks =>
    typeof v === 'string'

const isObject = exports.isObject =
  (v: mixed): boolean %checks =>
    !isNil(v) && typeof v === 'object'

// primitive types

const nil = exports.nil =
  (v: mixed): null => {
    if (isEmpty(v) || isNil(v)) return null
    throw error('null', typeof v)
  }

const undef = exports.undef =
  (v: mixed): void => {
    if (isEmpty(v) || isUndef(v)) return undefined
    throw error('undefined', typeof v)
  }

const boolean = exports.boolean =
  (v: mixed): boolean => {
    if (isEmpty(v)) return false
    if (isBoolean(v)) return v
    throw error('boolean', typeof v)
  }

const number = exports.number =
  (v: mixed): number => {
    if (isEmpty(v)) return 0
    if (isNumber(v)) return v
    throw error('number', typeof v)
  }

const string = exports.string =
  (v: mixed): string => {
    if (isEmpty(v)) return ''
    if (isString(v)) return v
    throw error('string', typeof v)
  }

// literal type

const literalOf = exports.literalOf = /*:: <T: Literal> */
  (literal: T): TypeValidator<T> =>
    (v: mixed) => {
      if (isEmpty(v) || (v === literal)) return literal
      throw error(`${typeof literal} literal`, typeof v)
    }

// mixed type

const mixed = exports.mixed =
  (v: mixed): * => v

// maybe type

const maybe = exports.maybe = /*:: <T> */
  (typeFn: TypeValidator<T>): TypeMaybeValidator<T> =>
    (v: mixed): ?T =>
      (isNil(v) || isUndef(v)) ? v : typeFn(v)

// object type

const object = exports.object =
  (v: mixed): ObjectRecord => {
    if (isEmpty(v)) return {}
    if (isObject(v)) return Object.assign({}, v)
    throw error('object', typeof v)
  }

const objectOf = exports.objectOf = /*:: <T, F: (ObjectRecord) => T> */
  (typeFn: F): TypeValidator<T> =>
    (v: mixed): T => {
      try { return typeFn(object(v)) } catch (_) {}
      throw new TypeError('invalid shape of object record')
    }

// array type

const arrayOf = exports.arrayOf = /*:: <T> */
  (typeFn: TypeValidator<T>): TypeArrayValidator<T> =>
    (v: mixed): T[] => {
      if (isEmpty(v)) return [typeFn(v)]
      if (Array.isArray(v)) return v.map(typeFn)
      throw error('array type', typeof v)
    }

// tuple type

const tupleOf1 = exports.tupleOf1 = /*:: <T> */
  (...typeFuncs: [TypeValidator<T>]): TypeValidator<[T]> =>
    (v: mixed) => {
      if (Array.isArray(v) && v.length === 1) {
        return [typeFuncs[0](v[0])]
      }
      throw error('tuple with cardinality of 1', typeof v)
    }

const tupleOf2 = exports.tupleOf2 = /*:: <T, U> */
  (...typeFuncs: TypeValidatorsOf2<T, U>): TypeValidator<[T, U]> =>
    (v: mixed) => {
      if (Array.isArray(v) && v.length === 2) {
        return [
          typeFuncs[0](v[0]),
          typeFuncs[1](v[1])
        ]
      }
      throw error('tuple with cardinality of 2', typeof v)
    }

const tupleOf3 = exports.tupleOf3 = /*:: <T, U, V> */
  (...typeFuncs: TypeValidatorsOf3<T, U, V>): TypeValidator<[T, U, V]> =>
    (v: mixed) => {
      if (Array.isArray(v) && v.length === 3) {
        return [
          typeFuncs[0](v[0]),
          typeFuncs[1](v[1]),
          typeFuncs[2](v[2])
        ]
      }
      throw error('tuple with cardinality of 3', typeof v)
    }

const tupleOf4 = exports.tupleOf4 = /*:: <T, U, V, Z> */
  (...typeFuncs: TypeValidatorsOf4<T, U, V, Z>): TypeValidator<[T, U, V, Z]> =>
    (v: mixed) => {
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

const tupleOf5 = exports.tupleOf5 = /*:: <T, U, V, Z, X> */
  (...typeFuncs: TypeValidatorsOf5<T, U, V, Z, X>): TypeValidator<[T, U, V, Z, X]> =>
    (v: mixed) => {
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

// union type

const unionOf2 = exports.unionOf2 = /*:: <T, U> */
  (...typeFuncs: TypeValidatorsOf2<T, U>): TypeValidator<T | U> =>
    (v: mixed) => {
      try { return typeFuncs[0](v) } catch (_) {}
      try { return typeFuncs[1](v) } catch (_) {}
      throw error('union', typeof v)
    }

const unionOf3 = exports.unionOf3 = /*:: <T, U, V> */
  (...typeFuncs: TypeValidatorsOf3<T, U, V>): TypeValidator<T | U | V> =>
    (v: mixed) => {
      try { return typeFuncs[0](v) } catch (_) {}
      try { return typeFuncs[1](v) } catch (_) {}
      try { return typeFuncs[2](v) } catch (_) {}
      throw error('union', typeof v)
    }

const unionOf4 = exports.unionOf4 = /*:: <T, U, V, Z> */
  (...typeFuncs: TypeValidatorsOf4<T, U, V, Z>): TypeValidator<T | U | V | Z> =>
    (v: mixed) => {
      try { return typeFuncs[0](v) } catch (_) {}
      try { return typeFuncs[1](v) } catch (_) {}
      try { return typeFuncs[2](v) } catch (_) {}
      try { return typeFuncs[3](v) } catch (_) {}
      throw error('union', typeof v)
    }

const unionOf5 = exports.unionOf5 = /*:: <T, U, V, Z, X> */
  (...typeFuncs: TypeValidatorsOf5<T, U, V, Z, X>): TypeValidator<T | U | V | Z | X> =>
    (v: mixed) => {
      try { return typeFuncs[0](v) } catch (_) {}
      try { return typeFuncs[1](v) } catch (_) {}
      try { return typeFuncs[2](v) } catch (_) {}
      try { return typeFuncs[3](v) } catch (_) {}
      try { return typeFuncs[4](v) } catch (_) {}
      throw error('union', typeof v)
    }

// utilities

const isType = exports.isType = /*:: <T, F: TypeValidator<T>> */
  (typeFn: F): TypeValidator<boolean> =>
    (v: mixed): boolean => {
      try {
        typeFn(v)
        return true
      } catch (_) {
        return false
      }
    }

// This function will return value based on schema with inferred types. This
// value can be used to define type in Flow with 'typeof' utility.

exports.typeOf = /*:: <T> */
  (schema: TypeValidator<T>): T =>
    schema(EMTPY_VALUE)
