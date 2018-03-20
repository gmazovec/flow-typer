// @flow

export type LiteralValue = boolean | number | string
export type ObjectRecord<T> = { [key: string]: T }
export type TypeValidator<T> = (mixed) => T
export type TypeMaybeValidator<T> = (mixed) => ?T
export type TypeArrayValidator<T> = (mixed) => T[]
export type TypeValidatorRecord<T> = ObjectRecord<TypeValidator<T>>
export type $Literal<T: LiteralValue> = TypeValidator<T>

export type TypeValidatorsOf2<T, U> = [
  TypeValidator<T>,
  TypeValidator<U>
]

export type TypeValidatorsOf3<T, U, V> = [
  TypeValidator<T>,
  TypeValidator<U>,
  TypeValidator<V>
]

export type TypeValidatorsOf4<T, U, V, Z> = [
  TypeValidator<T>,
  TypeValidator<U>,
  TypeValidator<V>,
  TypeValidator<Z>,
]

export type TypeValidatorsOf5<T, U, V, Z, X> = [
  TypeValidator<T>,
  TypeValidator<U>,
  TypeValidator<V>,
  TypeValidator<Z>,
  TypeValidator<X>
]

module.exports = {
  ...(require('./is')),
  ...(require('./utils')),
  ...(require('./types/primitives')),
  ...(require('./types/literals')),
  ...(require('./types/maybe')),
  ...(require('./types/mixed')),
  ...(require('./types/object')),
  ...(require('./types/array')),
  ...(require('./types/tuple')),
  ...(require('./types/union'))
}
