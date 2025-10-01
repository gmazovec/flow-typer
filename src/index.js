// @flow

import * as error from './error.js'
import * as is from './is.js'
import * as utils from './utils.js'

import * as array from './types/array.js'
import * as literals from './types/literals.js'
import * as map from './types/map.js'
import * as _maybe from './types/maybe.js'
import * as _mixed from './types/mixed.js'
import * as _object from './types/object.js'
import * as primitives from './types/primitives.js'
import * as tuple from './types/tuple.js'
import * as union from './types/union.js'

export type LiteralValue = boolean | number | string
export type ObjectRecord<T> = { [key: string]: T }
/*:: export type TypeValidatorMap<T> = { [key in keyof T]: ReturnType<T[key]> } */
export type TypeChecker<T> = (mixed, _?:string) => T
export type TypeValidator<T> = { (mixed, _?:string): T, type: (?{ noVoid: boolean }) => string, ... }
export type TypeMaybeValidator<T> = { (mixed, _?:string): ?T, type: () => string, ... }
export type TypeArrayValidator<T> = { (mixed, _?:string): T[], type: () => string, ... }
export type TypeCallbackValidator<T> = { (mixed, _?:string): ReturnType<T>, type: (?{ noVoid: boolean }) => string, ... }
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


export const isNil = is.isNil
export const isUndef = is.isUndef
export const isBoolean = is.isBoolean
export const isNumber = is.isNumber
export const isString = is.isString
export const isObject = is.isObject

export const isType = utils.isType
export const typeOf = utils.typeOf
export const getType = utils.getType

export const TypeValidatorError = error.TypeValidatorError
export const validatorError = error.validatorError

export const nil = primitives.nil
export const undef = primitives.undef
export const boolean = primitives.boolean
export const number = primitives.number
export const string = primitives.string

export const literalOf = literals.literalOf

export const maybe = _maybe.maybe

export const mixed = _mixed.mixed

export const object = _object.object
export const objectOf = _object.objectOf
export const optional = _object.optional

export const arrayOf = array.arrayOf

export const tupleOf = tuple.tupleOf

export const unionOf = union.unionOf

export const mapOf = map.mapOf
