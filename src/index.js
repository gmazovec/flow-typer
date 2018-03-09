// @flow

// types

export type Literal = null | void | boolean | number | string
export type ObjectRecord = { [string]: mixed }
export type TypeValidator<T> = (mixed) => T
export type TypeMaybeValidator<T> = (mixed) => ?T
export type TypeArrayValidator<T> = (mixed) => T[]

// type helpers

// This symbol can be passed to validators to indicate empty value. Validators
// will return default value for specific type. The default values are used to
// construct inferred types.

const EMTPY_VALUE = Symbol('@@empty')

const isEmpty = (v: mixed): boolean %checks =>
  v === EMTPY_VALUE

const isNil = (v: mixed): boolean %checks =>
  v === null

const isUndef = (v: mixed): boolean %checks =>
  typeof v === 'undefined'

const isBoolean = (v: mixed): boolean %checks =>
  typeof v === 'boolean'

const isNumber = (v: mixed): boolean %checks =>
  typeof v === 'number'

const isString = (v: mixed): boolean %checks =>
  typeof v === 'string'

const isObject = (v: mixed): boolean %checks =>
  !isNil(v) && typeof v === 'object'

// primitive types

const nil =
  (v: mixed): null => {
    if (isEmpty(v) || isNil(v)) return null
    throw new TypeError()
  }

const undef =
  (v: mixed): void => {
    if (isEmpty(v) || isUndef(v)) return undefined
    throw new TypeError()
  }

const boolean =
  (v: mixed): boolean => {
    if (isEmpty(v)) return false
    if (isBoolean(v)) return v
    throw new TypeError()
  }

const number =
  (v: mixed): number => {
    if (isEmpty(v)) return 0
    if (isNumber(v)) return v
    throw new TypeError()
  }

const string =
  (v: mixed): string => {
    if (isEmpty(v)) return ''
    if (isString(v)) return v
    throw new TypeError()
  }

// literal type

const literalOf = /*:: <T: Literal> */
  (literal: T): TypeValidator<T> =>
    (v: mixed) => {
      if (isEmpty(v) || (v === literal)) return literal
      throw new TypeError()
    }

// mixed type

const mixed =
  (v: mixed): * => v

// maybe type

const maybe = /*:: <T> */
  (typeFn: TypeValidator<T>): TypeMaybeValidator<T> =>
    (v: mixed): ?T =>
      (isNil(v) || isUndef(v)) ? v : typeFn(v)

// object type

const object =
  (v: mixed): ObjectRecord => {
    if (isEmpty(v)) return {}
    if (isObject(v)) return Object.assign({}, v)
    throw new TypeError(`invalid object type; got type '${typeof v}'`)
  }

const objectOf = /*:: <T, F: (ObjectRecord) => T> */
  (typeFn: F): TypeValidator<T> =>
    (v: mixed): T =>
      typeFn(object(v))

// array type

const arrayOf = /*:: <T> */
  (typeFn: TypeValidator<T>): TypeArrayValidator<T> =>
    (v: mixed): T[] => {
      if (isEmpty(v)) return [typeFn(v)]
      if (Array.isArray(v)) return v.map(typeFn)
      throw new TypeError('invalid array type')
    }

// tuple type

const tupleOf = /*:: <T, F: (mixed[]) => T> */
  (typeFn: F): TypeValidator<T> =>
    (v: mixed): T => {
      if (isEmpty(v)) return typeFn([v])
      if (Array.isArray(v)) return typeFn(v)
      throw new TypeError(`invalid tuple type`)
    }

// union type

const unionOf = /*:: <T, F: (mixed) => T, L: F[]> */
  (...typeFnList: L) =>
    (v: mixed) => {
      const typeFn = typeFnList.find(fn => isType(fn)(v))
      if (typeFn) return typeFn(v)
      throw new TypeError('invalid union type')
    }

// This function will return value based on schema with inferred types. This
// value can be used to define type in Flow with 'typeof' utility.

const typeOf = /*:: <T> */
  (schema: TypeValidator<T>): T =>
    schema(EMTPY_VALUE)

const isType = /*:: <T, F: TypeValidator<T>> */
  (typeFn: F): TypeValidator<boolean> =>
    (v: mixed): boolean => {
      try {
        typeFn(v)
        return true
      } catch (_) {
        return false
      }
    }

//

module.exports = Object.freeze({
  isNil,
  isUndef,
  isBoolean,
  isNumber,
  isString,
  isObject,
  nil,
  undef,
  boolean,
  number,
  string,
  literalOf,
  mixed,
  maybe,
  object,
  objectOf,
  arrayOf,
  tupleOf,
  unionOf,
  typeOf,
  isType
})
