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
    throw new TypeError()
  }

const undef = exports.undef =
  (v: mixed): void => {
    if (isEmpty(v) || isUndef(v)) return undefined
    throw new TypeError()
  }

const boolean = exports.boolean =
  (v: mixed): boolean => {
    if (isEmpty(v)) return false
    if (isBoolean(v)) return v
    throw new TypeError()
  }

const number = exports.number =
  (v: mixed): number => {
    if (isEmpty(v)) return 0
    if (isNumber(v)) return v
    throw new TypeError()
  }

const string = exports.string =
  (v: mixed): string => {
    if (isEmpty(v)) return ''
    if (isString(v)) return v
    throw new TypeError()
  }

// literal type

const literalOf = exports.literalOf = /*:: <T: Literal> */
  (literal: T): TypeValidator<T> =>
    (v: mixed) => {
      if (isEmpty(v) || (v === literal)) return literal
      throw new TypeError()
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
    throw new TypeError(`invalid object type; got type '${typeof v}'`)
  }

const objectOf = exports.objectOf = /*:: <T, F: (ObjectRecord) => T> */
  (typeFn: F): TypeValidator<T> =>
    (v: mixed): T =>
      typeFn(object(v))

// array type

const arrayOf = exports.arrayOf = /*:: <T> */
  (typeFn: TypeValidator<T>): TypeArrayValidator<T> =>
    (v: mixed): T[] => {
      if (isEmpty(v)) return [typeFn(v)]
      if (Array.isArray(v)) return v.map(typeFn)
      throw new TypeError('invalid array type')
    }

// tuple type

const tupleOf = exports.tupleOf = /*:: <T, F: (mixed[]) => T> */
  (typeFn: F): TypeValidator<T> =>
    (v: mixed): T => {
      if (isEmpty(v)) return typeFn([v])
      if (Array.isArray(v)) return typeFn(v)
      throw new TypeError(`invalid tuple type`)
    }

// union type

const unionOf = exports.unionOf = /*:: <T, F: (mixed) => T, L: F[]> */
  (...typeFnList: L) =>
    (v: mixed) => {
      const typeFn = typeFnList.find(fn => isType(fn)(v))
      if (typeFn) return typeFn(v)
      throw new TypeError('invalid union type')
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
