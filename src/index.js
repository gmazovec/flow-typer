// @flow

// types

export type Literal = null | void | boolean | number | string
export type ObjectRecord = { [string]: mixed }
export type TypeValidator<T> = (mixed) => T
export type TypeMaybeValidator<T> = (mixed) => ?T
export type TypeArrayValidator<T> = (mixed) => T[]

// This type is used for implement unionOf validator. The return value is wrapped
// so that validators can be chained with OR operator. If the validator returns
// null it means the validation failed and execution jumps to next validator. In
// case where TypeValue type is returned we return and unwrap the value.

export type TypeValue<T> = ?[T]
export type TypeChecker<T> = (mixed) => TypeValue<T>

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


// wrapping helpers

function wrap <T> (v: T): [T] {
  return [v]
}

function unwrap <T> (typedV: TypeValue<T>): T {
  if (typedV) return typedV[0]
  throw new TypeError('invalid type')
}


// primitive types

const nil = (v: mixed): null =>
  unwrap(nil_(v))

const nil_ = (v: mixed): TypeValue<null> =>
  isEmpty(v) || isNil(v) ? wrap(null) : undefined

const undef = (v: mixed): void =>
  unwrap(undef_(v))

const undef_ = (v: mixed): TypeValue<void> =>
  isEmpty(v) || isUndef(v) ? wrap(undefined) : undefined

const boolean = (v: mixed): boolean =>
  unwrap(boolean_(v))

const boolean_ = (v: mixed): TypeValue<boolean> =>
  !isEmpty(v)
    ? isBoolean(v) ? wrap(v) : undefined
    : wrap(false)

const number = (v: mixed): number =>
  unwrap(number_(v))

const number_ = (v: mixed): TypeValue<number> =>
  !isEmpty(v)
    ? isNumber(v) ? wrap(v) : undefined
    : wrap(0)

const string = (v: mixed): string =>
  unwrap(string_(v))

const string_ = (v: mixed): TypeValue<string> =>
    !isEmpty(v)
      ? isString(v) ? wrap(v) : undefined
      : wrap('')


// literal type

const literalOf = /*:: <T: Literal> */
  (literal: T): TypeValidator<T> =>
    (v: mixed) =>
      unwrap(literalOf_(literal)(v))

const literalOf_ = /*:: <T: Literal> */
  (literal: T): TypeChecker<T> =>
    (v: mixed): TypeValue<T> =>
      isEmpty(v) || (v === literal) ? wrap(literal) : undefined

// mixed type

const mixed = (v: mixed): * => v

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

const unionOf = /*:: <T, F: (mixed) => TypeValue<T>> */
  (typeFn: F): TypeValidator<T> =>
    (v: mixed): T => {
      const typedV = typeFn(v)
      if (Array.isArray(typedV) && typedV.length === 1) return typedV[0]
      throw new TypeError('invalid union type')
    }

// This function will return value based on schema with inferred types. This
// value can be used to define type in Flow with 'typeof' utility.

const typeOf = /*:: <T> */
  (schema: TypeValidator<T>): T =>
    schema(EMTPY_VALUE)

//

module.exports = Object.freeze({
  isNil,
  isUndef,
  isBoolean,
  isNumber,
  isString,
  isObject,
  nil_,
  nil,
  undef_,
  undef,
  boolean_,
  boolean,
  number_,
  number,
  string_,
  string,
  literalOf_,
  literalOf,
  mixed,
  maybe,
  object,
  objectOf,
  arrayOf,
  tupleOf,
  unionOf,
  typeOf
})
